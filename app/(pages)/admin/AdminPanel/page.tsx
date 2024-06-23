"use client";

import React, { useEffect } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import ROLE from "../../../common/role";
import { User } from "@/types";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/_components/Header";
import Navbar from "@/app/_components/Navbar";

const AdminPanel = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state?.user?.user) as User;

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden">
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
        <div className="">
          <nav className="grid p-4 ">
            <Link
              href={"/admin/AllUsers"}
              className="px-2 py-1  text-lg rounded-md shadow-sm hover:bg-slate-100"
            >
              All Users
            </Link>
            <Link
              href={"/admin/AllProducts"}
              className="px-2 py-1 text-lg rounded-md shadow-sm hover:bg-slate-100"
            >
              All product
            </Link>
          </nav>
        </div>
      </aside>

      <main className="flex justify-center items-center flex-col pt-28">
        <div className="flex justify-center items-center text-4xl text-gray-500  h-80 mx-40">
          This Panel is for Admins Only.
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;