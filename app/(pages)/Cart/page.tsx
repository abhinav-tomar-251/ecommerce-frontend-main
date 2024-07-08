"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { useAppDispatch } from "@/lib/hooks";
import {
  fetchCart,
  updateCart,
  deleteCartProduct,
} from "@/lib/store/cartSlice";
import displayINRCurrency from "@/actions/displayCurrency";
import { MdDelete } from "react-icons/md";
import Header from "@/app/_components/Header";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { BounceLoader } from "react-spinners";
import BackendApi from "@/app/common";
import { useRouter } from "next/navigation";

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, loading } = useSelector((state: RootState) => state.cart);
  const user = useSelector((state: RootState) => state.user.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      dispatch(fetchCart());
    }
  }, [dispatch, user, router]);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateCart({ id, quantity }));
  };

  const handleDeleteCartProduct = (id: string) => {
    dispatch(deleteCartProduct(id));
  };

  const totalQty = data.reduce((prev, curr) => prev + curr.quantity, 0);
  const totalPrice = data.reduce(
    (prev, curr) => prev + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  const handlePayment = async () => {
    const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
    if (!stripePublicKey) {
      console.error("Stripe public key is undefined.");
      return;
    }

    const stripe = await loadStripe(stripePublicKey);

    if (!stripe) {
      console.error("Failed to initialize Stripe.");
      return;
    }

    const response = await fetch(BackendApi.payment.url, {
      method: BackendApi.payment.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItems: data }),
    });

    const responseData = await response.json();

    if (responseData?.id) {
      const { error } = await stripe.redirectToCheckout({
        sessionId: responseData.id,
      });

      if (error) {
        console.error("Failed to redirect to checkout:", error);
      }
    } else {
      console.error("No session ID returned from backend");
    }
  };

  // Using Axios 

// const handlePayment = async () => {
//   const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
//   if (!stripePublicKey) {
//     console.error("Stripe public key is undefined.");
//     return;
//   }

//   const stripe = await loadStripe(stripePublicKey);

//   if (!stripe) {
//     console.error("Failed to initialize Stripe.");
//     return;
//   }

//   try {
//     const response = await axios({
//       method: BackendApi.payment.method, 
//       url: BackendApi.payment.url,
//       withCredentials: true, 
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       data: {
//         cartItems: data, 
//       },
//     });

//     const responseData = response.data;

//     if (responseData?.id) {
//       const { error } = await stripe.redirectToCheckout({
//         sessionId: responseData.id,
//       });

//       if (error) {
//         console.error("Failed to redirect to checkout:", error);
//       }
//     } else {
//       console.error("No session ID returned from backend");
//     }
//   } catch (error) {
//     console.error("Error while making payment request:", error);
//   }
// };


  if (!user) {
    return  <div className="flex flex-col justify-center items-center h-screen">
              <BounceLoader size={50} className="text-gray-800" loading />
              <p className="bg-white py-5">Cart is Empty</p>
            </div>
  }

  return (
    <>
      <header className="fixed shadow-md bg-white w-full z-40">
        <Header />
        <Navbar />
      </header>
      <main className="pt-28 w-full overflow-hidden scroll-smooth">
        <div className="container mx-auto">
          <div className="text-center text-3xl my-3">
            {data.length === 0 && !loading && (
              <div className="flex flex-col justify-center items-center">
                <BounceLoader size={50} className="text-gray-800" loading />
                <p className="bg-white py-5">Cart is Empty</p>
              </div>
            )}
          </div>
          <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
            <div className="w-full max-w-3xl">
              {loading
                ? Array(4)
                    .fill(null)
                    .map((_, index) => (
                      <div
                        key={`loading-${index}`}
                        className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                      ></div>
                    ))
                : data.map((product) => (
                    <div
                      key={product._id}
                      className="w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]"
                    >
                      <div className="w-32 h-32 bg-slate-200">
                        <img
                          src={product.productId.productImage[0]}
                          className="w-full h-full object-scale-down mix-blend-multiply"
                          alt={product.productId.productName}
                        />
                      </div>
                      <div className="px-4 py-2 relative">
                        <div
                          className="absolute right-0 text-gray-600 rounded-full p-2 hover:bg-gray-600 hover:text-white cursor-pointer"
                          onClick={() => handleDeleteCartProduct(product._id)}
                        >
                          <MdDelete />
                        </div>
                        <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                          {product.productId.productName}
                        </h2>
                        <p className="capitalize text-slate-500">
                          {product.productId.category}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-gray-600 font-medium text-lg">
                            {displayINRCurrency(
                              product?.productId?.sellingPrice
                            )}
                          </p>
                          <p className="text-slate-600 font-semibold text-lg">
                            {displayINRCurrency(
                              product?.productId?.sellingPrice *
                                product?.quantity
                            )}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <button
                            className="border border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                            onClick={() =>
                              handleUpdateQuantity(
                                product?._id,
                                product?.quantity - 1
                              )
                            }
                            disabled={product?.quantity <= 1}
                          >
                            -
                          </button>
                          <span>{product?.quantity}</span>
                          <button
                            className="border border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                            onClick={() =>
                              handleUpdateQuantity(
                                product?._id,
                                product?.quantity + 1
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
            {data.length > 0 && (
              <div className="w-full lg:w-96 p-4 bg-white border border-slate-300 h-max rounded">
                <h2 className="text-xl font-semibold">Summary</h2>
                <div className="py-2 my-4 border-b border-slate-200 flex justify-between items-center">
                  <span>Total Items:</span>
                  <span>{totalQty}</span>
                </div>
                <div className="py-2 my-4 border-b border-slate-200 flex justify-between items-center">
                  <span>Total Price:</span>
                  <span>{displayINRCurrency(totalPrice)}</span>
                </div>
                <div className="w-full text-center mt-2">
                  <button
                    className="bg-gray-600 text-white font-medium py-1 px-4 w-full"
                    onClick={handlePayment}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CartPage;
