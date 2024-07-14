'use client'
import Header from "@/app/_components/Header";
import Navbar from "@/app/_components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import React, { useState } from "react";
import { toast } from "react-toastify";
import { forgotPassword } from "@/actions/authService";

interface ForgotPasswordResponse {
  message: string;
}

const ForgotPassword: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response: ForgotPasswordResponse = await forgotPassword(email);
      console.log('response', response)
      toast.success(response.message);
      router.push('/auth/Login');
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.error('Error Resetting password. Please try again.');
    }
  };

  return (
    <>
      <header className="fixed shadow-md bg-white w-full z-40">
        <Header />
        <Navbar />
      </header>
      <section id="forgot-password" className="pt-28">
        <div className="mx-auto container p-4">
          <div className="bg-slate-400 rounded-lg shadow-lg item-content p-5 w-full max-w-md mx-auto">
            <h2 className="text-center text-2xl mb-6">Forgot Password</h2>
            <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <label>Email: </label>
                <div className="bg-slate-100 p-2 rounded-md">
                  <input
                    type="email"
                    placeholder="enter your email"
                    value={email}
                    onChange={handleOnChange}
                    required
                    className="w-full h-full outline-none bg-transparent"
                  />
                </div>
              </div>
              <button type="submit" className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
                Submit
              </button>
            </form>
            <p className="my-5">
              Remembered your password?{" "}
              <Link
                href={"/auth/Login"}
                passHref
                className="text-slate-800 hover:text-slate-700 hover:underline"
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

export default ForgotPassword;
