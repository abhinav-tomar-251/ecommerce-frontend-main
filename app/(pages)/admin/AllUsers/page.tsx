"use client";

import React, { useEffect, useState } from "react";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
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
import { BounceLoader } from "react-spinners";
import { fetchAllUsers } from "@/actions/allUsers";
import { toast } from "react-toastify";

const AllUsers: React.FC = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state?.user?.user) as User;
  const [loading, setLoading] = useState(false);

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [openUpdateRole, setOpenUpdateRole] = useState<boolean>(false);
  const [updateUserDetails, setUpdateUserDetails] = useState<User>({
    _id: "",
    name: "",
    email: "",
    role: "",
    password: "",
    subscribed_plan: "",
    active_plan: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  useEffect(() => {
    const fetchData = async () => {
      const users = await fetchAllUsers();
      setAllUsers(users);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setLoading(true);
    if (user?.role !== ROLE.ADMIN) {
      setLoading(false);
      toast.error("Please login as an Admin !")
      router.push("/");
    }
  }, [user, router]);

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
      ) : (
        <div className="flex justify-center items-center h-screen">
          <BounceLoader size={150} className="text-gray-800" loading />
        </div>
      )}
    </>
  );
};

export default AllUsers;
