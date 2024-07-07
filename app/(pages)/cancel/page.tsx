import React from "react";
import Image from "next/image";
import failed from "@/app/assest/cancel.gif";
import Header from "@/app/_components/Header";
import Navbar from "@/app/_components/Navbar";
import Link from "next/link";

const StripeCancel = () => {
  return (
    <>
      <header className="fixed shadow-md bg-white w-full z-40">
        <Header />
        <Navbar />
      </header>
      <main className="pt-28 w-full overflow-hidden scroll-smooth">
        <div className="bg-slate-200 w-full max-w-md mx-auto my-28  flex justify-center items-center flex-col p-4 m-2 rounded">
          <Image
            src={failed}
            width={150}
            height={150}
            alt="failed"
            className="mix-blend-multiply"
          />
          <p className="text-red-600 font-bold text-xl">Payment Failed</p>
          <Link
            href={"/Cart"}
            className="p-2 px-3 mt-5 border-2 border-red-600 rounded font-semibold text-red-600 hover:bg-red-600 hover:text-white"
          >
            Go To Cart
          </Link>
        </div>
      </main>
    </>
  );
};

export default StripeCancel;
