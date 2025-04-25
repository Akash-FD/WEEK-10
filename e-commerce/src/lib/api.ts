import { addtocart } from "@/type";
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
  api.put(`/cart/${id}`, quantity, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const RemoveCartProduct = (id: number) =>
  api.delete(`/cart/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
