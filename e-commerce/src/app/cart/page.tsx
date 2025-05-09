"use client";

import { useCartContext } from "@/context/CartContext";
import {
  GetCartDetails,
  RemoveCartProduct,
  UpdateCartDetails,
} from "@/lib/api";
import { cartdataTypes } from "@/type";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiSolidMinusCircle } from "react-icons/bi";
import { BsPlusCircleFill } from "react-icons/bs";

export default function Cart() {
  const [cartData, setCartData] = useState<cartdataTypes[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const { setCartLength } = useCartContext();

  const getCartData = async () => {
    try {
      const res = await GetCartDetails();
      setCartData(res.data.items);
      setCartTotal(res.data?.total || 0);
      setCartLength(res.data?.items?.length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  const updateQuantity = async (id: number, quantity: number) => {

    try {
      await UpdateCartDetails(id, quantity);
      getCartData();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCartProduct = async (id: number) => {
    try {
       await RemoveCartProduct(id);
      getCartData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="w-[80%] m-auto max-sm:w-[90%]">
        <div className="m-auto mt-6 p-4 max-sm:mt-2">
          <div className="addtocart">
            <ul className="flex font-bold text-center pb-3 max-sm:text-[10px]">
              <li className="flex-[1] max-sm:flex-[1]">Product</li>
              <li className="flex-[1] max-sm:flex-[1]">Name</li>
              <li className="flex-[1] max-sm:flex-[1]">Price</li>
              <li className="flex-[1] max-sm:flex-[1]">Quantity</li>
              <li className="flex-[1] max-sm:flex-[1]">Subtotal</li>
              <li className="flex-[1] max-sm:flex-[1]">Remove</li>
            </ul>
            <hr />
            {cartData.length === 0 && (
              <h1 className="text-center text-3xl my-2 border py-2 text-slate-400">
                Cart is Empty
              </h1>
            )}
            <div className="max-h-[40vh] overflow-y-scroll scroll-smooth">
              {cartData.map((item) => (
                <div
                  key={item.id}
                  className="flex text-center items-center py-3 border-b max-sm:text-[8px]"
                >
                  <div className="flex-[1]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={200}
                      height={100}
                      quality={100}
                      priority={true}
                      className="w-[40px] object-contain m-auto"
                    />
                  </div>
                  <div className="flex-[1]">{item.name}</div>
                  <div className="flex-[1]">{item.price}</div>

                  <div className="flex-[1] items-center justify-center max-sm:flex max-sm:flex-col">
                    <BiSolidMinusCircle
                      className="inline text-[30px]"
                      onClick={() => {
                        if (item.quantity > 1) {
                          updateQuantity(item.id, item.quantity - 1);
                        } else {
                          deleteCartProduct(item.id);
                        }
                      }}
                    />
                    <span className="inline-block mx-3">{item.quantity}</span>
                    <BsPlusCircleFill
                      className="inline text-[25px]"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    />
                  </div>
                  <div className="flex-[1]"> {item.subtotal}</div>
                  <button
                    className="flex-[1] text-2xl"
                    onClick={() => deleteCartProduct(item.id)}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="cart-total p-2 flex flex-row-reverse gap-10 my-8 max-sm:flex-col max-sm:gap-5">
          <div className="promo-code flex-[1] flex flex-col gap-5 max-sm:text-center max-sm:mt-5 max-sm:gap-2 max-sm:text-sm bg-gray-100 p-4 rounded-lg">
            <p>If you have any promo code, Enter it here</p>
            <div>
              <input
                type="text"
                placeholder="Enter promo code"
                className="border py-2 px-5 max-sm:mb-3"
              />
              <button className="bg-black text-white py-2 px-10 max-sm:px-5 max-sm:py-2">
                Submit
              </button>
            </div>
          </div>
          <div className="amount flex flex-col gap-2 flex-[1] bg-gray-100 p-4 rounded-lg">
            <h2 className="font-bold text-2xl mb-3">Cart Total</h2>
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>${cartTotal}</p>
            </div>
            <hr />
            <div className="flex justify-between">
              <p>Shipping fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="font-bold flex justify-between">
              <p>Total</p>
              <p>${cartTotal}</p>
            </div>
            <hr />
            <div className="payment">
              {cartData.length !== 0 &&
               <Link
               href="/confirmorder"
               className="bg-yellow-400 block text-center w-[150px] mt-3 px-4 py-2 hover:bg-yellow-500 rounded-md font-bold"
             >
               Click to Pay
             </Link> }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
