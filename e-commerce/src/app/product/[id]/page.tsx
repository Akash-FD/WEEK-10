"use client";
import { ProductInfo } from "@/lib/auth";
import { allProductTypes } from "@/type";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const productInfo = () => {
  const params = useParams();
  const [productDataById, setProductDataById] =
    useState<allProductTypes | null>(null);
  console.log(params.id);
  useEffect(() => {
    const fetchId = async () => {
      try {
        const res = await ProductInfo(Number(params.id));
        console.log(res.data.data);
        if (res.status === 200) {
          setProductDataById(res.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchId();
  }, [params.id]);

  return (
    <div className="w-[80%] m-auto max-sm:w-[85%]">
      <div className="container m-auto">
        <div className="product-details m-auto flex gap-10 flex-1 flex-wrap justify-center max-sm:gap-3">
          <div className="view-display flex gap-8">
            <div className="display">
              <img
                src={productDataById?.images[0]}
                alt=""
                className="w-[80px] mb-3"
              />
              <img
                src={productDataById?.images[0]}
                alt=""
                className="w-[80px] mb-3"
              />
              <img
                src={productDataById?.images[0]}
                alt=""
                className="w-[80px] mb-3"
              />
              <img
                src={productDataById?.images[0]}
                alt=""
                className="w-[80px] mb-3"
              />
            </div>
            <div>
              <img src={productDataById?.images[0]} alt="" className="" />
            </div>
          </div>
          <div className="display-details flex-1 max-sm:mt-0">
            <div className="flex justify-center flex-col gap-5 max-sm:gap-2">
              <h2 className="text-3xl font-semibold max-sm:text-lg">
                {productDataById?.name}
              </h2>
              <p className="max-sm:text-sm">{productDataById?.description}</p>
              <div className="flex">
                <p className="text-xl line-through text-red-500 max-sm:text-sm">
                  $ {productDataById?.price}
                </p>
                <p className="ml-3 text-xl max-sm:text-sm">
                  $ {productDataById?.price}
                </p>
              </div>

              <button className="py-2 w-[180px] px-5 text-md text-white bg-red-600 hover:bg-red-800 max-sm:text-sm max-sm:w-[120px]">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default productInfo;
