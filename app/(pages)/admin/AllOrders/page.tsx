"use client";

import React, { useEffect, useState } from "react";
import BackendApi from "@/app/common";
import moment from "moment";
import displayINRCurrency from "@/actions/displayCurrency";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { Order, User } from "@/types";
import ROLE from "@/app/common/role";
import Header from "@/app/_components/Header";
import Navbar from "@/app/_components/Navbar";
import { FaRegCircleUser } from "react-icons/fa6";
import { BounceLoader } from "react-spinners";
import { fetchOrderDetails } from "@/actions/alladminOrders";
import { toast } from "react-toastify";


const AllOrder: React.FC = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state?.user?.user) as User;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (user?.role !== ROLE.ADMIN) {
      setLoading(false);
      toast.error("Please login as an Admin !")
      router.push("/");
    }
  }, [user, router]);

  const [data, setData] = useState<Order[]>([]);

  
  useEffect(() => {
    const fetchData = async () => {
      const orders = await fetchOrderDetails();
      setData(orders);
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="min-h-screen md:flex hidden ">
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
          <main className="w-full h-full pt-28">
            {!data[0] && (
              <div className="flex flex-col justify-center items-center">
                <BounceLoader size={150} className="text-gray-800" />
                <p className="text-center text-4xl text-gray-700">
                  No Order available
                </p>
              </div>
            )}
              <div>
                <div className="bg-white py-2 px-4 flex justify-between items-center">
                  <h2 className="font-bold text-lg">All Orders</h2>
                </div>
                <div className="p-4 h-[calc(100vh-190px)] w-full overflow-y-scroll scroll-smooth scrollbar-none">
                  {data.map((item, index) => (
                    <div key={item.userId + index}>
                      <p className="font-medium text-lg">
                        {moment(item.createdAt).format("LL")}
                      </p>
                      <div className="border rounded p-2  bg-slate-100">
                        <div className="flex flex-col lg:flex-row justify-between">
                          <div className="grid gap-1">
                            <p className="text-lg">
                              {item.name}{" "}
                              <span className="text-gray-500  text-sm">
                                {item.email}
                              </span>
                            </p>
                            {item.productDetails.map((product, idx) => (
                              <div
                                key={product.productId + idx}
                                className="flex gap-3"
                              >
                                <Image
                                  src={product.image[0]}
                                  width={112}
                                  height={112}
                                  className=" bg-slate-300 object-scale-down p-2"
                                  alt={product.name}
                                />
                                <div>
                                  <div className="font-medium text-lg text-ellipsis line-clamp-1">
                                    {product.name}
                                  </div>
                                  <div className="flex items-center gap-5 mt-1">
                                    <div className="text-lg text-gray-500">
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
                                  Shipping Amount :{" "}
                                  {displayINRCurrency(shipping.shipping_amount)}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="font-semibold ml-auto w-fit lg:text-lg">
                          Total Amount : {displayINRCurrency(item.totalAmount)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
