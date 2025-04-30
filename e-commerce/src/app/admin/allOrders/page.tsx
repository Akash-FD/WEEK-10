"use client";
import { DeleteOneOrder, EditOneOrder, GetAllOrders } from "@/lib/api";
import { AllOrderData, Status } from "@/type";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const allOrders = () => {
  const [orderData, setOrdersData] = useState<AllOrderData[]>([]);
  // const { setEditData, setProductId } = useEditProduct()
  const [orderStatus, setOrderStatus] = useState("");
  const [orderId, setOrderId] = useState(0)
  console.log(orderData);

  const router = useRouter();
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

  const hanldeDelete = async (id: number) => {
    console.log(id);

    try {
      const res = await DeleteOneOrder(id);
      if (res.status === 200) {
        alert("product deleted");
        const getall = await GetAllOrders();
        setOrdersData(getall.data);
      }
    } catch (err) {
      console.log("somthing went worng", err);
    }
  };

  const hanldeEdit = async (id: number, status: string) => {
    setOrderStatus(status);
    setOrderId(id)
  };

  const updateStatus = async () => {
    try {
      const statusObj = {
        status: orderStatus,
      };
      if (orderStatus=== "") {
        alert("you are not updating the status")
        
      }
      const res = await EditOneOrder(orderId, statusObj);
      if (res.status === 200) {
        alert("product edited");
        fetchAllProduct()
      }
    } catch (err) {
      console.log("somthing went worng", err);
    }
    setOrderStatus("")
  };

  return (
    <div className="">
      <div className="flex justify-center items-center gap-3">
        <select
          name=""
          id=""
          className="w-[200px] border py-1 my-2"
          value={orderStatus}
          onChange={(e) => setOrderStatus(e.target.value)}
        >
          <option value="">update Status</option>
          <option value="PENDING">PENDING</option>
          <option value="PROCESSING">PROCESSING</option>
          <option value="SHIPPED">SHIPPED</option>
          <option value="DELIVERED">DELIVERED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
        <button onClick={updateStatus} className="bg-yellow-500 px-3 py-1 rounded-lg">Save</button>
      </div>

      <div className="w-full overflow-x-auto">
        {orderData.length !== 0 ? (
          <table className="w-full min-w-[600px] border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3 border-b">Id</th>
                <th className="text-left p-3 border-b">buyer</th>
                <th className="text-left p-3 border-b">Product id</th>
                <th className="text-left p-3 border-b">Product Name</th>
                <th className="text-left p-3 border-b">Quantity</th>
                <th className="text-left p-3 border-b">Status</th>
                <th className="text-left p-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((order) =>
                order.products.map((product) => (
                  <tr key={`${order.order_id}_${product.product_id}`} className="hover:bg-gray-50">
                    <td className="p-3 border-b font-medium">
                      {order.order_id}
                    </td>
                    <td className="p-3 border-b font-medium">
                      {order.buyer.name}
                    </td>
                    <td className="p-3 border-b font-medium">
                      {product.product_id}
                    </td>
                    <td className="p-3 border-b font-medium">{product.name}</td>
                    <td className="p-3 border-b font-medium">
                      {product.quantity}
                    </td>
                    <td className="p-3 border-b font-medium">{order.status}</td>
                    <td className="p-3 border-b">
                      <div className="flex gap-2">
                        <button
                          className="bg-yellow-500 hover:bg-yellow-600 text-black text-sm px-3 py-1 rounded-md"
                          onClick={() =>
                            hanldeEdit(order.order_id , order.status)
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded-md"
                          onClick={() => hanldeDelete(order.order_id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        ) : (
          <h1 className="text-center w-full text-gray-500 mt-10 text-xl">
            No product added
          </h1>
        )}
      </div>
    </div>
  );
};

export default allOrders;
