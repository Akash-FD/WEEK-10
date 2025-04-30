"use client";
import { GetAllOrders } from "@/lib/api";
import { AllOrderData } from "@/type";
import React, { useEffect, useState } from "react";

const buyerDashboard = () => {
  const [orderData, setOrdersData] = useState<AllOrderData[]>([]);
  // const { setEditData, setProductId } = useEditProduct()
  console.log(orderData);

 
  console.log(orderData);

  //
  const fetchAllProduct = async () => {
    try {
        const res = await GetAllOrders();
        setOrdersData(res.data);
      } catch (err) {
        console.log("somthing went worng", err);
      }
    };
    
    useEffect(() => {
    fetchAllProduct();
  }, []);



  return (
    <div className="overflow-x-auto min-h-screen">
    <table className="min-w-2xl text-center border mx-auto mt-20 ">
      <thead className="py-2">
        <tr className="border-b text-gray-600 py-2">
          <th>Name</th>
          <th>Qty</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {orderData.length === 0 ? (
          <tr>
            <td colSpan={5} className="py-8 text-gray-400">
              Cart is Empty
            </td>
          </tr>
        ) : (
            orderData.map((order) =>
                order.products.map((product) => (
            <tr key={order.order_id} className="border-b">
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{order.status}</td>
            </tr>
          ))
        ))
    }
      </tbody>
    </table>
  </div>

  );
};

export default buyerDashboard;
