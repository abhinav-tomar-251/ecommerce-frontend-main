"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import BackendApi from "@/app/common";
import moment from "moment";
import displayINRCurrency from "@/actions/displayCurrency";
import Header from "@/app/_components/Header";
import Navbar from "@/app/_components/Navbar";
import Image from "next/image";

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

const OrderPage: React.FC = () => {
  const [data, setData] = useState<Order[]>([]);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get<{ data: Order[] }>(BackendApi.getOrder.url, {
        withCredentials: true,
      });
      setData(response.data.data);
      console.log("order list", response.data);
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error("Error fetching order details:", errorMessage);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <>
      <div className="h-[calc(100vh-190px)] md:flex hidden overflow-y-hidden scrollbar-none">
        <header className="fixed shadow-md bg-white w-full z-40">
          <Header />
          <Navbar />
        </header>
        <main className="w-full h-full pt-28">
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
    </>
  );
};

export default OrderPage;
