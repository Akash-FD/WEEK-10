"use client";

import { useEffect, useState } from "react";
import { getUser } from "@/lib/auth";
import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";
import { User } from "@/type";
import { GetCartDetails } from "@/lib/api";

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [cartLength, setCartLength] = useState<number>(0);
  console.log(cartLength);

  console.log(user);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUser();
      setUser(res.data);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const cartLength = async () => {
      const res = await GetCartDetails();
      setCartLength(res.data.items.length);
    };
    cartLength();
  }, []);

  return (
    <div className="sticky top-0 z-20 bg-white shadow-md">
      <nav className="flex justify-between items-center border-b px-6 py-4">
        <Link href="/" className="text-4xl font-bold font-sans text-gray-800">
          Shop
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/cart" className="relative">
            <FaCartShopping className="text-3xl text-gray-700 hover:text-black transition" />
            {cartLength > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartLength}
              </span>
            )}
          </Link>

          {typeof window !== 'undefined' && localStorage.getItem("token") ? (
            <div className="flex gap-4">
               <button className="bg-blue-500 text-white text-lg font-medium px-5 py-1 rounded-lg hover:bg-gray-800 transition">
              {user === null ? "No User" : user?.name}
            </button>
             
            <Link href="/login" className="bg-blue-500 text-white text-lg font-medium px-5 py-1 rounded-lg hover:bg-gray-800 transition">
              logout
            </Link>
            </div>
          ) : (
            <Link
                href="/login"
                className="bg-blue-500 text-white text-lg font-medium px-4 py-2 rounded-full hover:bg-gray-800 transition"
              >
                Login
              </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
