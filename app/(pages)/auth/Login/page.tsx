"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Header from "@/app/_components/Header";
import Navbar from "@/app/_components/Navbar";
import { toast } from "react-toastify";
import { useAppContext } from "@/context";
import { login } from "@/actions/authService";

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { fetchUserDetails, cartProductCount } = useAppContext();

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await login(data);
      if (response.success) {
        toast.success(response.message);
        router.push('/');
        fetchUserDetails();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Error signing in:', error);
      toast.error('Error signing in. Please try again.');
    }
  };
  return (
    <>
      <header className="fixed shadow-md bg-white w-full z-40">
        <Header />
        <Navbar />
      </header>
      <section id="login" className="pt-28">
        <div className="mx-auto container p-4">
          <div className="bg-slate-400 rounded-lg shadow-lg item-content p-5 w-full max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto">
              <FaUserCircle className="text-6xl text-gray-600" />
            </div>

            <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <label>Email : </label>
                <div className="bg-slate-100 p-2 rounded-md">
                  <input
                    type="email"
                    placeholder="enter email"
                    name="email"
                    value={data.email}
                    onChange={handleOnChange}
                    required
                    className="w-full h-full outline-none bg-transparent"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <label>Password : </label>
                <div className="bg-slate-100 p-2 flex rounded-md">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="enter password"
                    value={data.password}
                    name="password"
                    onChange={handleOnChange}
                    required
                    className="w-full h-full outline-none bg-transparent"
                  />
                  <div
                    className="cursor-pointer text-xl"
                    onClick={() => setShowPassword((preve) => !preve)}
                  >
                    <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                  </div>
                </div>
                <Link
                  href={"/auth/ForgotPassword"}
                  className="block w-fit ml-auto hover:underline hover:text-red-600"
                >
                  Forgot password ?
                </Link>
              </div>

              <button className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
                Login
              </button>
            </form>

            <p className="my-5">
              Not have an account ?{" "}
              <Link
                href={"/auth/Register"}
                className=" text-slate-800 hover:text-slate-700 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;