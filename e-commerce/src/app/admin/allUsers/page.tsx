"use client";

import { useEditProduct } from "@/context/ProductContext";
import { DeleteProduct, DeleteUser, GetAllProduct, GetAllUsers } from "@/lib/api";
import { allProductTypes } from "@/type";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const allUsers = () => {
  const [userData, setUserData] = useState<any[]>([]);
  console.log(userData);
  
//   const { setEditData, setProductId } = useEditProduct()
  const router = useRouter()

// 
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await GetAllUsers();
        console.log(res.data);
        
        setUserData(res.data)
      } catch (err) {
        console.log("somthing went worng", err);
      }
    };
    fetchAllUsers();
  }, []);

  const hanldeDelete = async (id: number) => {
    console.log(id);

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
    {userData.length !== 0 ? (
      <table className="w-full min-w-[600px] border border-gray-300">
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
          {userData.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="p-3 border-b font-medium">{item.id}</td>
              <td className="p-3 border-b font-medium">{item.name}</td>
              <td className="p-3 border-b font-medium">{item.email}</td>
              {item.role === "Buyer" ? <td className="p-3 border-b font-medium">Buyer</td> : <td className="p-3 border-b font-bold">Admin</td>}
              {/* <td className="p-3 border-b font-medium">{item.role}</td> */}
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
    ) : (
      <h1 className="text-center w-full text-gray-500 mt-10 text-xl">No product added</h1>
    )}
  </div>
  
  
  );
};

export default allUsers;
