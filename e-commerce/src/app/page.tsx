"use client";

import { GetAllProduct } from "@/lib/api";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const home = () => {
  const [productData, setProductData] = useState<any[]>([]);

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

  return (
    <div className="flex container mx-auto">
      <div className="min-w-[220px] ">
        <h1 className="text-2xl">Shor by</h1>
      </div>
      <div className="flex flex-wrap gap-5">
        {productData.map((item) => {
          return (
            <div
              key={item.id}
              className="card w-[280px] max-lg:w-[200px] max-md:w-[140px] p-3 bg-white rounded-lg shadow-lg hover:scale-105 transition-all duration-200"
            >
              <div className="w-full h-[250px] flex items-center justify-center overflow-hidden bg-gray-100 rounded">
                <img
                  src={item.images[0]}
                  alt=""
                  className="object-contain h-full w-full"
                />
              </div>
              <p className="mt-3 font-medium text-gray-800 max-lg:text-lg">
                {item.name}
              </p>
              <div className="flex justify-between items-center gap-4 ">
                {/* <p className="">Quntity : {item.quantity}</p> */}
                <p>${item.price}</p>
              </div>
              <Link
                href={`/product/${item.id}`}
                className="block text-center py-1 my-1 w-full bg-black text-white"
              >
                View details
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default home;

