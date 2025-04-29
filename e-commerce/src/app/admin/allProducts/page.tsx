"use client";

import { useEditProduct } from "@/context/ProductContext";
import { DeleteProduct, GetAllProduct } from "@/lib/api";
import { allProductTypes } from "@/type";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const allProduct = () => {
  const [productData, setProductData] = useState<any[]>([]);
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
    <div className="w-full overflow-x-auto overflow-y-scroll h-[600px]">
    {productData.length !== 0 ? (
      <table className="w-full min-w-[600px] border border-gray-300">
        <thead className="bg-gray-100 ">
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
          {productData.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="p-3 border-b">
                <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-contain" />
              </td>
              <td className="p-3 border-b font-medium">{item.name}</td>
              <td className="p-3 border-b font-medium">{item.description}</td>
              <td className="p-3 border-b font-medium">{item.category}</td>
              <td className="p-3 border-b">{item.quantity}</td>
              <td className="p-3 border-b text-green-600 font-semibold">${item.price}</td>
              <td className="p-3 border-b">
                <div className="flex gap-2">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1 rounded-md"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
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

export default allProduct;