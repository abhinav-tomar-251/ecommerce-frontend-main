"use client";

import React, { useContext, useEffect, useState } from "react";
import BackendApi from "@/app/common";
import { useAppContext } from "@/context";
import displayINRCurrency from "@/actions/displayCurrency";
import { MdDelete } from "react-icons/md";
import Header from "@/app/_components/Header";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";
import { loadStripe } from "@stripe/stripe-js";
// import { Product } from '@/types'

interface Product {
  _id: string;
  quantity: number;
  productId: {
    productName: string;
    productImage: string[];
    category: string;
    sellingPrice: number;
  };
}

const CartPage: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const context = useAppContext();
  const loadingCart = new Array(4).fill(null);

  const fetchData = async () => {
    const response = await fetch(BackendApi.addToCartProductView.url, {
      method: BackendApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();

    if (responseData.success) {
      setData(responseData.data);
    }
  };

  const handleLoading = async () => {
    await fetchData();
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, []);

  const increaseQty = async (id: string, qty: number) => {
    const response = await fetch(BackendApi.updateCartProduct.url, {
      method: BackendApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const responseData = await response.json();
    
    if (responseData.success) {
      fetchData();
    }
  };

  const decreaseQty = async (id: string, qty: number) => {
    if (qty >= 2) {
      const response = await fetch(BackendApi.updateCartProduct.url, {
        method: BackendApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    }
  };

  const deleteCartProduct = async (id: string) => {
    const response = await fetch(BackendApi.deleteCartProduct.url, {
      method: BackendApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPrice = data.reduce(
    (previousValue, currentValue) =>
      previousValue +
      currentValue.quantity * currentValue?.productId?.sellingPrice,
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

  return (
    <>
      <header className="fixed shadow-md bg-white w-full z-40">
        <Header />
        <Navbar />
      </header>
      <main className="pt-28 w-full overflow-hidden scroll-smooth">
        <div className="container mx-auto">
          <div className="text-center text-lg my-3">
            {data.length === 0 && !loading && (
              <p className="bg-white py-5">Cart is Empty</p>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
            {/*** view product */}
            <div className="w-full max-w-3xl">
              {loading
                ? loadingCart.map((el, index) => (
                    <div
                      key={`loading-${index}`}
                      className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                    ></div>
                  ))
                : data.map((product, index) => (
                    <div
                      key={product?._id}
                      className="w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]"
                    >
                      <div className="w-32 h-32 bg-slate-200">
                        <img
                          src={product?.productId?.productImage[0]}
                          className="w-full h-full object-scale-down mix-blend-multiply"
                        />
                      </div>
                      <div className="px-4 py-2 relative">
                        {/**delete product */}
                        <div
                          className="absolute right-0 text-gray-600 rounded-full p-2 hover:bg-gray-600 hover:text-white cursor-pointer"
                          onClick={() => deleteCartProduct(product?._id)}
                        >
                          <MdDelete />
                        </div>

                        <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                          {product?.productId?.productName}
                        </h2>
                        <p className="capitalize text-slate-500">
                          {product?.productId.category}
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
                            className="border border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "
                            onClick={() =>
                              decreaseQty(product?._id, product?.quantity)
                            }
                          >
                            -
                          </button>
                          <span>{product?.quantity}</span>
                          <button
                            className="border border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "
                            onClick={() =>
                              increaseQty(product?._id, product?.quantity)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>

            {/*** cart summary  */}
            {data[0] && (
              <div className="mt-5 lg:mt-0 w-full max-w-sm">
                {loading ? (
                  <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse" />
                ) : (
                  <div className="h-36 bg-white rounded-md shadow-md px-2">
                    <h2 className="text-white bg-gray-600 px-4 py-1 rounded-sm">
                      Cart Summary
                    </h2>
                    <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                      <p>Quantity</p>
                      <p>{totalQty}</p>
                    </div>

                    <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                      <p>Total Price</p>
                      <p>{displayINRCurrency(totalPrice)}</p>
                    </div>

                    <button
                      onClick={handlePayment}
                      className="bg-gray-800 p-2 text-white w-full rounded-md mt-2 hover:bg-gray-500"
                    >
                      Checkout
                    </button>
                  </div>
                )}
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
