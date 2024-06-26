import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="bg-black w-full  text-white font-semibold flex justify-center items-center gap-x-2 p-1">
      Sign up and get 20% off to your first order.{" "}
      <Link href="/auth/Register" className="text-lg underline ">
        Sign Up Now
      </Link>
    </div>
  );
};

export default Header;
