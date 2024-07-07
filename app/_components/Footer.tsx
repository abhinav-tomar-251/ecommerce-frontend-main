"use client";

import { useEffect, useState } from "react";
import {
  FaArrowUp,
  FaApplePay,
  FaCcMastercard,
  FaCcPaypal,
  FaCcVisa,
  FaFacebookF,
  FaGithub,
  FaGooglePay,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer className="bg-footer_color flex flex-col mt-28 pb-12">
      {showButton && (
        <button
          className="fixed bottom-4 right-4 bg-gray-900 text-white rounded-full p-2 shadow-md"
          onClick={scrollToTop}
        >
          <FaArrowUp />
        </button>
      )}
     
      <div className="flex sm:flex-row flex-col sm:gap-x-16 justify-between items-start px-20 sm:px-30 sm:pt-16 ">
        <div className="flex flex-col gap-y-8 py-16  w-full sm:w-1/4">
          <h2 className="lg:text-3xl md:text-xl font-extrabold ">
            🛒e-commerce
          </h2>
          <p className="font-normal text-slate-500 ">
            We have clothes that suits your style and which you’re proud to
            wear. From women to men.
          </p>
          <div className="flex sm:flex-row gap-x-4 ">
            <FaTwitter className="bg-white text-black p-2 rounded-full w-12 h-12" />
            <FaFacebookF className="bg-black text-white  p-2 rounded-full w-11 h-11" />
            <FaInstagram className="bg-white p-2 rounded-full w-12 h-12" />
            <FaGithub className="bg-white p-2 rounded-full w-12 h-12" />
          </div>
        </div>
        <div className="flex flex-col gap-y-8 py-16 w-full sm:w-1/4">
          <h2 className="lg:text-2xl md:text-lg font-semiabold ">COMPANY</h2>
          <div className=" flex-col">
            <p className="text-slate-500 fornt-normal ">About</p>
            <p className="text-slate-500 fornt-normal ">Features</p>
            <p className="text-slate-500 fornt-normal ">Works</p>
            <p className="text-slate-500 fornt-normal ">Career</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-8 py-16 w-full sm:w-1/4">
          <h2 className="text-2xl font-semiabold ">HELP</h2>
          <div className=" flex-col">
            <p className="text-slate-500 fornt-normal ">Customer Support</p>
            <p className="text-slate-500 fornt-normal ">Delivery Details</p>
            <p className="text-slate-500 fornt-normal ">Terms & Conditions</p>
            <p className="text-slate-500 fornt-normal ">Privacy Policy</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-8 py-16 w-full sm:w-1/4">
          <h2 className="text-2xl font-semiabold ">FAQ</h2>
          <div className=" flex-col">
            <p className="text-slate-500 fornt-normal ">Account</p>
            <p className="text-slate-500 fornt-normal ">MAnage Deliveries</p>
            <p className="text-slate-500 fornt-normal ">Orders</p>
            <p className="text-slate-500 fornt-normal ">Payments</p>
          </div>
        </div>
      </div>
      <div className="relative flex  sm:mx-32  items-center">
        <div className="flex-grow border-t border-gray-400"></div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center px-6 sm:mx-48 py-2 gap-2">
        <p className="text-slate-500 font-normal text-nowrap sm:text-wrap">
          © 2000-2024, All rights reserved
        </p>
        <div className="flex gap-x-8">
          <FaCcVisa className=" w-8 h-8" />
          <FaCcMastercard className="w-8 h-8" />
          <FaCcPaypal className="w-8 h-8" />
          <FaApplePay className="w-8 h-8" />
          <FaGooglePay className="w-8 h-8" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
