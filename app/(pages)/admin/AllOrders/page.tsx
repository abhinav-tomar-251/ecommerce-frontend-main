"use client";

import React, { useEffect, useState } from "react";
import BackendApi from "@/app/common";
import moment from "moment";
import displayINRCurrency from "@/actions/displayCurrency";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { User } from "@/types";
import ROLE from "@/app/common/role";
import Header from "@/app/_components/Header";
import Navbar from "@/app/_components/Navbar";
import { FaRegCircleUser } from "react-icons/fa6";
import { BounceLoader } from "react-spinners";

interface ProductDetails {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string[];
}

interface PaymentDetails {
  payment_method_type: string[];
  payment_status: string;
}

interface ShippingOptions {
  shipping_rate: string;
  shipping_amount: string;
}

interface Order {
  userId: string;
  createdAt: string;
  productDetails: ProductDetails[];
  paymentDetails: PaymentDetails;
  shipping_options: ShippingOptions[];
  totalAmount: string;
}

const AllOrder: React.FC = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state?.user?.user) as User;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (user?.role !== ROLE.ADMIN) {
      setLoading(false);
      router.push("/");
    }
  }, [user, router]);

  const [data, setData] = useState<Order[]>([]);

  const fetchOrderDetails = async () => {
    const response = await fetch(BackendApi.allOrder.url, {
      method: BackendApi.allOrder.method,
      credentials: "include",
    });

    const responseData = await response.json();
    setData(responseData.data);
    console.log("order list", responseData);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <>
      {loading ? (
        <div className="h-[calc(100vh-10px)] md:flex hidden overflow-y-hidden scrollbar-none">
          <header className="fixed shadow-md bg-white w-full z-40">
            <Header />
            <Navbar />
          </header>
          <aside className="bg-white min-h-full  w-full  max-w-60 customShadow pt-28">
            <div className="h-32  flex justify-center items-center flex-col">
              <div className="text-5xl cursor-pointer relative flex justify-center">
                {user?.profilePic ? (
                  <Image
                    src={user?.profilePic}
                    width={80}
                    height={80}
                    className=" rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
              <p className="capitalize text-lg font-semibold">{user?.name}</p>
              <p className="text-sm">{user?.role}</p>
            </div>

            {/***navigation */}
            <div>
              <nav className="grid p-4">
                <Link
                  href={"/admin/AllUsers"}
                  className="px-2 py-1 hover:bg-slate-100"
                >
                  All Users
                </Link>
                <Link
                  href={"/admin/AllProducts"}
                  className="px-2 py-1 hover:bg-slate-100"
                >
                  All Products
                </Link>
                <Link
                  href={"/admin/AllOrders"}
                  className="px-2 py-1 hover:bg-slate-100"
                >
                  All Orders
                </Link>
              </nav>
            </div>
          </aside>
          <main className="w-full h-full pt-28 overflow-y-scroll scroll-smooth ">
            {!data[0] && (
              <p className="text-center text-4xl text-gray-700">
                No Order available
              </p>
            )}
            <div className="p-4 w-full">
              {data.map((item, index) => (
                <div key={item.userId + index}>
                  <p className="font-medium text-lg">
                    {moment(item.createdAt).format("LL")}
                  </p>
                  <div className="border rounded p-2">
                    <div className="flex flex-col lg:flex-row justify-between">
                      <div className="grid gap-1">
                        {item.productDetails.map((product, idx) => (
                          <div
                            key={product.productId + idx}
                            className="flex gap-3 bg-slate-100"
                          >
                            <Image
                              src={product.image[0]}
                              width={112}
                              height={112}
                              className=" bg-slate-200 object-scale-down p-2"
                              alt={product.name}
                            />
                            <div>
                              <div className="font-medium text-lg text-ellipsis line-clamp-1">
                                {product.name}
                              </div>
                              <div className="flex items-center gap-5 mt-1">
                                <div className="text-lg text-red-500">
                                  {displayINRCurrency(product.price)}
                                </div>
                                <p>Quantity : {product.quantity}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col gap-4 p-2 min-w-[300px]">
                        <div>
                          <div className="text-lg font-medium">
                            Payment Details :
                          </div>
                          <p className="ml-1">
                            Payment method :{" "}
                            {item.paymentDetails.payment_method_type[0]}
                          </p>
                          <p className="ml-1">
                            Payment Status :{" "}
                            {item.paymentDetails.payment_status}
                          </p>
                        </div>
                        <div>
                          <div className="text-lg font-medium">
                            Shipping Details :
                          </div>
                          {item.shipping_options.map((shipping, idx) => (
                            <div
                              key={shipping.shipping_rate + idx}
                              className="ml-1"
                            >
                              Shipping Amount : {shipping.shipping_amount}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="font-semibold ml-auto w-fit lg:text-lg">
                      Total Amount : {item.totalAmount}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <BounceLoader size={150} className="text-gray-800" loading />
        </div>
      )}
    </>
  );
};

export default AllOrder;