"use client";
import { emailObjType, LoginTypes, RegisterTypes } from "@/type";
import { api } from "./api";

export const RegisterUser = (data: RegisterTypes) =>
  api.post("/auth/register", data);

export const LoginUser = (data: LoginTypes) => api.post("/auth/login", data);


export const getUser = () =>
  api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });


  // forget password api

  export const EmailVerify = (email:emailObjType) =>
    api.post("/auth/forgot-password", email);
 

