"use client";
import { DeleteOneOrder, EditOneOrder, GetAllOrders } from "@/lib/api";
import { AllOrderData, Status } from "@/type";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const allOrders = () => {
  const [orderData, setOrdersData] = useState<AllOrderData[]>([]);
  // const { setEditData, setProductId } = useEditProduct()
  // const [orderStatus, setOrderStatus] = useState("");
  // const [orderId, setOrderId] = useState(0)
  const [search, setSearch] = useState("");
  const [editorder, setEditOrder] = useState<AllOrderData | null>(null);

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

  // const hanldeEdit = async (id: number, status: string) => {
  //   setOrderStatus(status);
  //   setOrderId(id)
  // };

  const updateStatus = async (id:number) => {
    try {
      const statusObj = {
        status: editorder?.status || "PENDING"
      };
      
      if (editorder?.status=== "") {
        alert("you are not updating the status")
        return;
      }
      const res = await EditOneOrder(id, statusObj);
      if (res.status === 200) {
        alert("product edited");
        fetchAllProduct()
      }
    } catch (err) {
      console.log("somthing went worng", err);
    } finally{
      setEditOrder(null)
    }
  
  }

  return (
    <div className="">
       <input type="search" placeholder="Search product or category"  value={search} onChange={(e)=>setSearch(e.target.value)} className="w-[95%] border bg-white sticky py-1 mb-3 px-2 focus:border-blue-500"/>

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
              {orderData.filter((value)=>search.toLowerCase() === "" ? value : value.order_id.toString().startsWith(search) || value.status.toLowerCase().startsWith(search)).map((order) =>
                order.products.map((product) => (
                  <tr
                    key={`${order.order_id}_${product.product_id}`}
                    className="hover:bg-gray-50"
                  >
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
                    {editorder?.order_id === order.order_id ? (
                      <td>
                        <select
                          name=""
                          id=""
                          className="w-[120px] border py-1 my-2"
                          value={editorder.status}
                          onChange={(e) => setEditOrder({...editorder, status:(e.target.value)})}
                        >
                          {/* <option value="">update Status</option> */}
                          <option value="PENDING">PENDING</option>
                          <option value="PROCESSING">PROCESSING</option>
                          <option value="SHIPPED">SHIPPED</option>
                          <option value="DELIVERED">DELIVERED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>
                    ) : (
                      <td className="p-3 border-b font-medium">
                        {order.status}
                      </td>
                    )}

                    <td className="p-3 border-b">
                      <div className="flex gap-2">
                       {editorder?.order_id === order.order_id ?<button
                          className="bg-yellow-500 hover:bg-yellow-600 text-black text-sm px-3 py-1 rounded-md"
                          onClick={() => updateStatus(editorder.order_id)}
                        >
                          Update
                        </button>
                        :
                        <button
                          className="bg-yellow-500 hover:bg-yellow-600 text-black text-sm px-3 py-1 rounded-md"
                          onClick={() => setEditOrder(order)}
                        >
                          Edit
                        </button>}
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
