import React from "react";
import Image from "next/image";
import Header from "@/app/_components/Header";
import Navbar from "@/app/_components/Navbar";
import success from "../../assest/success.gif";
import Link from "next/link";

const StripeSuccess = () => {
  return (
    <>
      <header className="fixed shadow-md bg-white w-full z-40">
        <Header />
        <Navbar />
      </header>
      <main className="pt-28 w-full ">
        <div className="bg-slate-200 w-full max-w-md mx-auto my-28 flex justify-center items-center flex-col p-4 m-2 rounded">
          <Image src={success} width={150} height={150} alt="success" />
          <p className="text-green-600 font-bold text-xl">
            Payment Successfull
          </p>
          <Link
            href={"/Order"}
            className="p-2 px-3 mt-5 border-2 border-green-600 rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white"
          >
            See Order
          </Link>
        </div>
      </main>
    </>
  );
};

export default StripeSuccess;
