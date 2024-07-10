"use client";
import Header from "@/app/_components/Header";
import Navbar from "@/app/_components/Navbar";
import BackendApi from "@/app/common";
import imageTobase64 from "@/actions/imageTobase64";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
    subscribed_plan:"",
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

  const handleUploadPic = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      const imagePic = (await imageTobase64(file)) as string;

      setData((preve) => {
        return {
          ...preve,
          profilePic: imagePic,
        };
      });
    }
  };

  
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (data.password === data.confirmPassword) {
    try {
      const response = await axios.post(BackendApi.signUP.url, {
        ...data, 
      });

      const { data: dataApi } = response;

      if (dataApi.success) {
        toast.success(dataApi.message);
        router.push('/auth/Login');
      } else {
        toast.error(dataApi.message);
      }
    } catch (error) {
      console.error('Error signing up:', error);
      toast.error('Error signing up. Please try again.');
    }
  } else {
    toast.error('Please check password and confirm password');
  }
};

  return (
    <>
      <header className="fixed shadow-md bg-white w-full z-40">
        <Header />
        <Navbar />
      </header>
      <section id="register" className="pt-28">
        <div className="mx-auto container p-4">
          <div className="bg-slate-400 rounded-lg shadow-lg item-content p-5 w-full max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
              <div className="profile-pic-container">
                {data && data.profilePic ? (
                  <Image
                    src={data.profilePic}
                    alt="login icon"
                    width={80}
                    height={80}
                  />
                ) : (
                  <FaUserCircle size={80} className="default-icon" />
                )}
              </div>
              <form>
                <label>
                  <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                    Upload Photo
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleUploadPic}
                  />
                </label>
              </form>
            </div>

            <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <label>Name : </label>
                <div className="bg-slate-100 p-2">
                  <input
                    type="text"
                    placeholder="enter your name"
                    name="name"
                    value={data.name}
                    onChange={handleOnChange}
                    required
                    className="w-full h-full outline-none bg-transparent"
                  />
                </div>
              </div>
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
                <div className="bg-slate-100 p-2 flex">
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
              </div>

              <div className="grid gap-2">
                <label>Confirm Password : </label>
                <div className="bg-slate-100 p-2 flex">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="enter confirm password"
                    value={data.confirmPassword}
                    name="confirmPassword"
                    onChange={handleOnChange}
                    required
                    className="w-full h-full outline-none bg-transparent"
                  />

                  <div
                    className="cursor-pointer text-xl"
                    onClick={() => setShowConfirmPassword((preve) => !preve)}
                  >
                    <span>
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
              </div>

              <button className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
                Sign Up
              </button>
            </form>

            <p className="my-5">
              Already have an account?{" "}
              <Link
                href={"/auth/Login"}
                className=" text-slate-800 hover:text-slate-700 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;