"use client";

import React, { useEffect, useState } from "react";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import BackendApi from "@/app/common";
import { toast } from "react-toastify";
import ChangeUserRole from "../../../_components/ChangeUserRole";
import Link from "next/link";
import { FaRegCircleUser } from "react-icons/fa6";
import Image from "next/image";
import Header from "@/app/_components/Header";
import Navbar from "@/app/_components/Navbar";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import ROLE from "@/app/common/role";
import { User } from "@/types";

const AllUsers: React.FC = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state?.user?.user) as User;

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [openUpdateRole, setOpenUpdateRole] = useState<boolean>(false);
  const [updateUserDetails, setUpdateUserDetails] = useState<User>({
    _id: "",
    name: "",
    email: "",
    role: "",
    password: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const fetchAllUsers = async () => {
    try {
      const fetchData = await fetch(BackendApi.allUser.url, {
        method: BackendApi.allUser.method,
        credentials: "include",
      });

      const dataResponse = await fetchData.json();

      if (dataResponse.success) {
        setAllUsers(dataResponse.data);
      }

      if (dataResponse.error) {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      console.error("Error fetching all users:", error);
      toast.error("Failed to fetch users. Please try again.");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

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
              All product
            </Link>
          </nav>
        </div>
      </aside>

      <main className="w-full h-full pt-28">
        <div className="bg-white pb-4">
          <table className=" w-full userTable">
            <thead>
              <tr className="bg-black text-white">
                <th>Sr.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{moment(user.createdAt).format("LL")}</td>
                  <td>
                    <button
                      className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                      onClick={() => {
                        setUpdateUserDetails(user);
                        setOpenUpdateRole(true);
                      }}
                    >
                      <MdModeEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {openUpdateRole && (
            <ChangeUserRole
              onClose={() => setOpenUpdateRole(false)}
              name={updateUserDetails.name}
              email={updateUserDetails.email}
              role={updateUserDetails.role}
              userId={updateUserDetails._id}
              callFunc={fetchAllUsers}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default AllUsers;