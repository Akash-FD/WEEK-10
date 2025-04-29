"use client";

import { GetCartDetails, PlaceOrder } from "@/lib/api";
import { cartdataTypes, orderDataObj, orderDataTypes } from "@/type";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ConfirmOrder() {
  const [cartData, setCartData] = useState<cartdataTypes[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [orderData, setOrderData] = useState<orderDataTypes[]>([]);
  const [address, setAddress] = useState<string>("");
  const router = useRouter();

  const orderDataObj: orderDataObj = {
    products: orderData,
    address: address,
  };
  console.log(orderDataObj);

  const getCartData = async () => {
    try {
      const res = await GetCartDetails();
      setCartData(res.data.items);
      setOrderData(
        res.data.items.map((item: cartdataTypes) => ({
          product_id: item.productId,
          quantity: item.quantity,
        }))
      );
      setCartTotal(res.data?.total || 0);
    } catch (err) {
      console.log(err);
    }
  };

  const PostOrderData = async () => {
    try {
      const res = await PlaceOrder(orderDataObj);
      alert("order placed");
      router.push("/placeorder");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  return (
    <div className="h-screen">
      <div className="w-[90%] mx-auto py-8 max-w-6xl">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-center mb-10">Checkout</h1>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Left Side - Cart Items */}
          <div className="flex-1 bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-center">
                <thead>
                  <tr className="border-b text-gray-600">
                    <th>Product</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartData.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-gray-400">
                        Cart is Empty
                      </td>
                    </tr>
                  ) : (
                    cartData.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-contain mx-auto"
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>${item.price}</td>
                        <td>{item.quantity}</td>
                        <td>${item.subtotal}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Side - Address & Total */}
          <div className="flex-1 bg-white p-6 rounded-2xl shadow-md flex flex-col gap-6">
            {/* Address Form */}
            <div>
              <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
              <div className="flex flex-col gap-4">
                <div>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Main St, City, State, Country, Zip Code"
                    className="w-full border p-4 rounded-lg min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Cart Total Section */}
              <div className="bg-gray-100 p-4 rounded-xl mt-6">
                <h3 className="text-lg font-bold mb-4">Order Summary</h3>
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>${cartTotal}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping Fee:</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                <div className="border-t mt-2 pt-2 flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>${cartTotal}</span>
                </div>

                {/* Confirm Order Button */}
                <button
                  onClick={() => PostOrderData()}
                  disabled={address.trim().length === 0}
                  className="block text-center mt-6 bg-yellow-400 hover:bg-yellow-500 text-black py-3 px-2 rounded-lg font-bold transition"
                >
                  Confirm Order & Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
