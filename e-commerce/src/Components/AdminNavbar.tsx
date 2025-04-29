"use client";

import { useEffect, useState } from "react";
import { getUser } from "@/lib/auth";
import Link from "next/link";
import { User } from "@/type";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

const AdminNavbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUser();
      setUser(res.data);
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const handleClick = () => {
    setOpenDropdown((prev) => !prev);
  };

  return (
    <div className="sticky top-0 z-30 bg-white shadow-sm">
      <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">

        <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-black transition">
          Admin
        </Link>

   
        <div className="relative flex items-center gap-4">
          {!user ? (
            <Link
              href="/login"
              className="bg-black text-white text-base font-medium px-5 py-2 rounded-full hover:bg-gray-800 transition"
            >
              Login
            </Link>
          ) : (
            <div className="flex items-center gap-2 cursor-pointer select-none" onClick={handleClick}>
              <FaUserCircle size={30} className="text-gray-600" />
              <span className="text-gray-700 font-semibold hidden sm:inline">{user.name}</span>

        
              <div
                className={`absolute right-0 top-14 w-64 bg-white rounded-lg shadow-lg p-4 space-y-4 transition-all duration-300 ${
                  openDropdown ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                }`}
              >
                <div className="flex flex-col text-sm">
                  <span className="font-semibold text-gray-800">{user.name}</span>
                  <span className="text-gray-500">{user.email}</span>
                  <span className="text-gray-400 mt-1">Role: {user.role}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-semibold transition"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default AdminNavbar;