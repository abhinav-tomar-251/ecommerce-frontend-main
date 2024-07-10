"use client";
import React, { useEffect, useState } from "react";
import BackendApi from "@/app/common";
import moment from "moment";
import displayINRCurrency from "@/actions/displayCurrency";
import Header from "@/app/_components/Header";
import Navbar from "@/app/_components/Navbar";
import Image from "next/image";
import { BounceLoader } from "react-spinners";
import Link from "next/link";
import NextBreadcrumb from "@/app/_components/breadNavigation";
import { FaAngleRight } from "react-icons/fa6";
import axios from "axios";
import { fetchUserOrderDetails } from "@/actions/userOrder";
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
  shipping_amount: number;
}

interface Order {
  userId: string;
  createdAt: string;
  receipt_url: string;
  productDetails: ProductDetails[];
  paymentDetails: PaymentDetails;
  shipping_options: ShippingOptions[];
  totalAmount: number;
}

const OrderPage = () => {
  const [data, setData] = useState<Order[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const orders = await fetchUserOrderDetails();
      setData(orders);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className=" md:flex hidden overflow-y-scroll scrollbar-none">
        <header className="fixed shadow-md bg-white w-full z-40">
          <Header />
          <Navbar />
        </header>
        <main className="w-full min-h-screen pt-28 mx-20">
          {!data[0] && (
            <div className="flex flex-col justify-center items-center">
              <BounceLoader size={150} className="text-gray-800" />
              <p className="text-center text-4xl text-gray-700">
                No Order available
              </p>
            </div>
          )}
          <div className="p-4 w-full">
            {data.map((item, index) => (
              <div key={item.userId + index}>
                <p className="font-medium text-lg">
                  {moment(item.createdAt).format("LL")}
                </p>
                <div className="border rounded p-2 bg-slate-100">
                  <div className="flex flex-col lg:flex-row justify-between px-6">
                    <div className="grid gap-1 ">
                      {item.productDetails.map((product, idx) => (
                        <div
                          key={product.productId + idx}
                          className="flex gap-3 "
                        >
                          <Image
                            src={product.image[0]}
                            width={112}
                            height={112}
                            className="object-scale-down mix-blend-multiply p-2"  
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
                          <Link
                            href={item.receipt_url}
                            className="text-gray-700"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Show Receipt
                          </Link>
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
                          Payment Status : {item.paymentDetails.payment_status}
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
        </main>
      </div>
    </>
  );
};

export default OrderPage;
