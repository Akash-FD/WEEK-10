"use client";

import { useEditProduct } from "@/context/ProductContext";
import { DeleteProduct, GetAllProduct } from "@/lib/api";
import { allProductTypes } from "@/type";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";

const allProduct = () => {
  const [productData, setProductData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const { setEditData, setProductId } = useEditProduct()
  const router = useRouter()
  console.log(productData)

// 
  useEffect(() => {
    const fetchAllProduct = async () => {
      try {
        const res = await GetAllProduct();
        setProductData(res.data.data);
      } catch (err) {
        console.log("somthing went worng", err);
      }
    };
    fetchAllProduct();
  }, []);

  const hanldeDelete = async (id: number) => {
    console.log(id);

    try {
      const res = await DeleteProduct(id);
      // const getall = productData.filter((item)=>item.id !== id)
      // setProductData(getall)
      console.log(res.status)
      if (res.status === 200) {
        alert("product deleted");
        const getall = await GetAllProduct();
        setProductData(getall.data.data);
      }
    } catch (err) {
      console.log("somthing went worng", err);
    }
  };

  const handleEdit = async(item:allProductTypes) => {
    setEditData(item)
    setProductId(item.id)
    router.push("/admin/addProduct")

  }
    
  return (
    <div className="w-full">
       <input type="search" placeholder="enter product or category"  value={search} onChange={(e)=>setSearch(e.target.value)} className="w-[95%] border bg-white sticky py-1 mb-3 px-2 focus:border-blue-500"/>
    <div className="w-full overflow-y-scroll h-[600px]">
    {productData.length !== 0 ? (
      <table className="w-full min-w-[1100px] border  border-gray-300">
        <thead className="bg-gray-200 ">
          <tr>
            <th className="text-left p-3 border-b">Image</th>
            <th className="text-left p-3 border-b">Name</th>
            <th className="text-left p-3 border-b">Description</th>
            <th className="text-left p-3 border-b">Categoty</th>
            <th className="text-left p-3 border-b">Quantity</th>
            <th className="text-left p-3 border-b">Price</th>
            <th className="text-left p-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {productData.filter((value)=>search.toLowerCase() === "" ? value: value.name.toLowerCase().startsWith(search) || value.category.toLowerCase().startsWith(search)).map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 bg-white">
              <td className="p-3 border-b">
                <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-contain" />
              </td>
              <td className="p-3 border-b font-medium">{item.name}</td>
              <td className="p-3 border-b font-medium">{item.description}</td>
              <td className="p-3 border-b font-medium">{item.category}</td>
              <td className="p-3 border-b">{item.quantity}</td>
              <td className="p-3 border-b text-green-600 font-semibold">${item.price}</td>
              <td className="p-3 border-b">
                <div className="flex items-center gap-5">
                  {/* <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1 rounded-md"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button> */}
                  <MdEditSquare  onClick={() => handleEdit(item)} className="text-gray-600 hover:text-gray-700 text-2xl"/>
                  {/* <button
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md"
                    onClick={() => hanldeDelete(item.id)}
                  >
                    Delete
                  </button> */}
                  <FaTrash onClick={() => hanldeDelete(item.id)} className="text-red-700 text-2xl hover:text-red-800"/>

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
  </div>
  
  
  );
};

export default allProduct;