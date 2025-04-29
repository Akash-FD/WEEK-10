import { addtocart, orderDataObj, Status } from "@/type";
import axios from "axios";

export const api = axios.create({
  // baseURL: " https://276c-125-20-216-178.ngrok-free.app/api",
  baseURL: "http://localhost:8000/api",
});

// const token = 'Authorization: `Bearer ${localStorage.getItem("token")}`'

export const addProduct = (data: FormData) =>
  api.post("/products", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const GetAllProduct = () => api.get("/products");

export const DeleteProduct = (id: number) =>
  api.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const EditProduct = (data: FormData, id: number) =>
  api.put(`/products/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const ProductInfo = (id: number) => api.get(`/products/${id}`);

// cart apis

export const AddProductCart = (data: addtocart) =>
  api.post(`/cart`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const GetCartDetails = () =>
  api.get(`/cart`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const UpdateCartDetails = (id: number, quantity: number) =>
  api.put(
    `/cart/${id}`,
    { quantity },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

export const RemoveCartProduct = (id: number) =>
  api.delete(`/cart/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

// get all  users

export const GetAllUsers = () =>
  api.get("admin/users", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const  DeleteUser = (id: number) =>
  api.delete(`/admin/users/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

// order apis

export const PlaceOrder = (orderData: orderDataObj) =>
  api.post(`/orders`, orderData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const GetAllOrders = () =>
  api.get(`/orders`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const DeleteOneOrder = (id:number) =>
  api.delete(`/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  export const EditOneOrder = (id:number, data:Status) =>
    api.put(`/orders/${id}/status`, data , {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });


  // filter api

  export const FilterProduct = (data:any) =>
    api.get(`/product-filters?${data}` , {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

