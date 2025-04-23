"use client";

import { DeleteProduct, GetAllProduct } from "@/lib/auth";
import { allProductTypes } from "@/type";
import React, { useEffect, useState } from "react";

const allProduct = () => {
  const [productData, setProductData] = useState<allProductTypes[]>([]);
  console.log(productData);

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

  const hanldeDelete = async (id:number)=>{
    console.log(id);
    
    try{
        const res = await DeleteProduct(id)
        console.log("heyyyyyy",res.data);
        // if (res.status === 200) {

        // const secondRes = await GetAllProduct();
        // setProductData(secondRes.data.data);
        // }

    }catch(err){
        console.log("somthing went worng", err);
    }

  }

  return (
    <div className="flex gap-5">
      {productData.map((item) => {
        return (
          <div key={item.id} className="card bg-gray-200 w-[280px] max-lg:w-[200px] max-md:w-[140px] h-full p-2 drop-shadow-xl hover:scale-105 transition-all duration-200">
            <img src={item.images[0]} alt="" className="object-contain" />
            <p className="my-2 max-lg:text-sm">{item.name}</p>
            <div className="flex justify-between items-center gap-4 ">
              <p className="">Quntity : {item.quantity}</p>
              <p>${item.price}</p>
            </div>
            <div className="flex justify-between items-center gap-4 ">
              <button className="bg-yellow-500">Edit</button>
              <button className="bg-red-500 text-white" onClick={() => hanldeDelete(item.id)}>Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default allProduct;
