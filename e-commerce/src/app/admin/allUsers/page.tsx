"use client";

import { DeleteUser, GetAllUsers } from "@/lib/api";
import { User } from "@/type";
import React, { useEffect, useState } from "react";

const AllUsers = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await GetAllUsers();
        setUserData(res.data);
      } catch (err) {
        console.log("somthing went worng", err);
      }
    };
    fetchAllUsers();
  }, []);

  const hanldeDelete = async (id: number) => {
    try {
      const res = await DeleteUser(id);

      if (res.status === 200) {
        alert("User deleted");
        const getall = await GetAllUsers();
        setUserData(getall.data);
      }
    } catch (err) {
      console.log("somthing went worng", err);
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <input
        type="search"
        placeholder="Search User"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-400 py-1 mb-3 px-2"
      />
      {userData.length !== 0 ? (
        <div className="min-w-[900px] max-h-[500px] overflow-y-scroll">
          <table className="w-full border border-gray-300 ">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3 border-b">Id</th>
                <th className="text-left p-3 border-b">Name</th>
                <th className="text-left p-3 border-b">email</th>
                <th className="text-left p-3 border-b">Role</th>
                <th className="text-left p-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userData
                .filter((value) =>
                  search.toLowerCase() === ""
                    ? value
                    : value.name.toLowerCase().startsWith(search) ||
                      value.email.toLowerCase().startsWith(search)
                )
                .map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-3 border-b font-medium">{item.id}</td>
                    <td className="p-3 border-b font-medium">{item.name}</td>
                    <td className="p-3 border-b font-medium">{item.email}</td>
                    {item.role === "Buyer" ? (
                      <td className="p-3 border-b font-medium">Buyer</td>
                    ) : (
                      <td className="p-3 border-b font-bold">Admin</td>
                    )}

                    <td className="p-3 border-b">
                      <div className="flex gap-2">
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md"
                          onClick={() => hanldeDelete(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="text-center w-full text-gray-500 mt-10 text-xl">
          No product added
        </h1>
      )}
    </div>
  );
};

export default AllUsers;
