"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { FaShoppingCart } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { User } from "@/types";
import Image from "next/image";
import BackendApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "@/lib/store/userSlice";
import ROLE from "../common/role";
import { useAppContext } from "@/context";
import { FaRegCircleUser } from "react-icons/fa6";

const Navbar: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state?.user?.user) as User;
  const { fetchUserDetails, cartProductCount } = useAppContext();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [search, setSearch] = useState("");

  const handleLogout = async () => {
    const fetchData = await fetch(BackendApi.logout_user.url, {
      method: BackendApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      router.push("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim() !== "") {
      router.push(`/ProductSearch?q=${search}`);
    } else {
      router.push("/ProductSearch");
    }
  };

  return (
    <nav className="h-16 shadow-md bg-white w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div>
          <Link href="/">
            <Logo />
          </Link>
        </div>

        <form
          className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="search product here..."
            className="w-full outline-none"
            onChange={handleSearch}
            value={search}
          />
          <button
            type="submit"
            className="text-lg min-w-[50px] h-8 bg-gray-600 flex items-center justify-center rounded-r-full text-white"
          >
            <GrSearch />
          </button>
        </form>

        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                {user?.profilePic ? (
                  <Image
                    src={user?.profilePic}
                    width={40}
                    height={40}
                    className="rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      href="/admin/AdminPanel"
                      className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                      onClick={() => setMenuDisplay((prev) => !prev)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <Link
                      href="/Order"
                      className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                      onClick={() => setMenuDisplay((prev) => !prev)}
                  >
                      My Orders
                  </Link>
                </nav>
              </div>
            )}
          </div>

          {user?._id && (
            <Link href="/Cart" className="text-2xl relative">
              <span>
                <FaShoppingCart />
              </span>

              <div className="bg-gray-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">{cartProductCount || 0}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white bg-gray-600 hover:bg-gray-700"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/auth/Login"
                className="px-3 py-1 rounded-full text-white bg-gray-600 hover:bg-gray-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
