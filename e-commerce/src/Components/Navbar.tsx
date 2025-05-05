"use client";

import { useEffect, useState } from "react";
import { getUser } from "@/lib/auth";
import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";
import { User } from "@/type";
import { GetCartDetails } from "@/lib/api";
import { useCartContext } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const router = useRouter();
  const { cartLength, setCartLength } = useCartContext();

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
  }, [setCartLength]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const handleClick = () => {
    setOpenDropdown((prev) => !prev);
  };

  return (
    <div className="sticky top-0 z-20 bg-white shadow-md">
      <nav className="flex justify-between items-center -b px-6 py-4 mx-5">
        <Link
          href="/"
          className="text-4xl font-semibold font-sans text-gray-800"
        >
          <span>Sky</span>
          <span className="text-sm">sales</span>
        </Link>

        <div className="flex items-center gap-10">
          <Link href="/cart" className="relative">
            <FaCartShopping className="text-3xl text-gray-700 hover:text-black transition" />
            {cartLength > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartLength}
              </span>
            )}
          </Link>

          <div className="relative flex items-center gap-4">
            {!user ? (
              <Link
                href="/login"
                className="bg-blue-500 text-white text-base font-medium px-5 py-2 rounded hover:bg-blue-600 transition"
              >
                Login
              </Link>
            ) : (
              <div className="flex items-center gap-10">
                <div
                  className="flex items-center gap-2 cursor-pointer select-none"
                  onClick={handleClick}
                >
                  <FaUserCircle size={30} className="text-gray-600" />
                  <span className="text-gray-700 font-semibold hidden sm:inline">
                    {user?.name}
                  </span>

                  <div
                    className={`absolute right-0 top-14 w-64 bg-white rounded-lg shadow-lg p-4 space-y-4 transition-all duration-300 ${
                      openDropdown
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-2"
                    }`}
                  >
                    <div className="flex flex-col text-sm">
                      <span className="font-semibold text-gray-800">
                        {user.name}
                      </span>
                      <span className="text-gray-500">{user.email}</span>
                      <span className="text-gray-400 mt-1">
                        Role: {user.role}
                      </span>
                    </div>
                    <Link
                      href="/buyerDashboard"
                      className="w-full block bg-red-500 hover:bg-red-600 text-white text-center py-2 rounded-md font-semibold transition"
                    >
                      your orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-semibold transition"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
