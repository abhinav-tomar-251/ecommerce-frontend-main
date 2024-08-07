"use client";

import React, { useEffect, useState } from "react";
import UploadProduct from "../../../_components/UploadProduct";
import AdminProductCard from "@/app/_components/AdminProductCard";
import Header from "@/app/_components/Header";
import Navbar from "@/app/_components/Navbar";
import Image from "next/image";
import { FaRegCircleUser } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import ROLE from "@/app/common/role";
import { User } from "@/types";
import { BounceLoader } from "react-spinners";
import { fetchAdminAllProduct } from "@/actions/adminAllProducts";
import { toast } from "react-toastify";


const AllProducts = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state?.user?.user) as User;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (user?.role !== ROLE.ADMIN) {
      setLoading(false);
      toast.error("Please login as an Admin !")
      router.push("/");
    }
  }, [user, router]);

  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const products = await fetchAdminAllProduct();
      setAllProduct(products);
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="min-h-screen md:flex hidden">
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
            <div>
              <nav className="grid p-4">
                <Link
                  href={"/admin/AllUsers"}
                  className="px-2 py-1 hover:bg-slate-100"
                >
                  All Users
                </Link>
                <Link
                  href={"/admin/AllProducts"}
                  className="px-2 py-1 hover:bg-slate-100"
                >
                  All Products
                </Link>
                <Link
                  href={"/admin/AllOrders"}
                  className="px-2 py-1 hover:bg-slate-100"
                >
                  All Orders
                </Link>
              </nav>
            </div>
          </aside>

          <main className="w-full h-full pt-28">
            <div>
              <div className="bg-white py-2 px-4 flex justify-between items-center">
                <h2 className="font-bold text-lg">All Product</h2>
                <button
                  className="border-2 bg-gray-300 border-gray-500 text-gray-800 hover:bg-gray-600 hover:text-white transition-all py-1 px-3 rounded-full "
                  onClick={() => setOpenUploadProduct(true)}
                >
                  Upload Product
                </button>
              </div>

              {/**all product */}
              <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
                {allProduct.map((product, index) => {
                  return (
                    <AdminProductCard
                      data={product}
                      key={index + "allProduct"}
                      fetchdata={fetchAdminAllProduct}
                    />
                  );
                })}
              </div>

              {/**upload prouct component */}
              {openUploadProduct && (
                <UploadProduct
                  onClose={() => setOpenUploadProduct(false)}
                  fetchData={fetchAdminAllProduct}
                />
              )}
            </div>
          </main>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <BounceLoader size={150} className="text-gray-800" loading />
        </div>
      )}
    </>
  );
};

export default AllProducts;
