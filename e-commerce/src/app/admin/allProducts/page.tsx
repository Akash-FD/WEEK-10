"use client";

import { DeleteProduct, EditProduct, GetAllProduct } from "@/lib/auth";
import { allProductTypes } from "@/type";
import React, { useEffect, useState } from "react";

const allProduct = () => {
  const [productData, setProductData] = useState<allProductTypes[]>([]);
  const [updatedData, setUpdatedData] = useState<allProductTypes>({} as allProductTypes);

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
      if (res.status === 200) {
        alert("product deleted");
        const getall = await GetAllProduct();
        setProductData(getall.data.data);
      }
    } catch (err) {
      console.log("somthing went worng", err);
    }
  };

  const handleEdit = async(item:FormData, id:number) => {
    try{

      const res = await EditProduct(item , id)

    }catch(err){
        console.log("somthing went worng", err);
    }

  }
    
  return (
    <div className="flex flex-wrap gap-5">
      {productData.map((item) => {
        return (
          <div
            key={item.id}
            className="card bg-gray-200 w-[280px] max-lg:w-[200px] max-md:w-[140px] h-[450px] p-2 drop-shadow-xl hover:scale-105 transition-all duration-200"
          >
            <img src={item.images[0]} alt="" className="object-contain my-auto" />
            <p className="my-2 max-lg:text-sm">{item.name}</p>
            <div className="flex justify-between items-center gap-4 ">
              <p className="">Quntity : {item.quantity}</p>
              <p>${item.price}</p>
            </div>
            <div className="flex justify-between items-center gap-4 ">
             <button className="bg-yellow-500 text-white" onClick={()=>handleEdit(item,id)}>Edit</button>
              <button
                className="bg-red-500 text-white"
                onClick={() => hanldeDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default allProduct;
