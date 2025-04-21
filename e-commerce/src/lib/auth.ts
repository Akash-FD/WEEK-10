import { LoginTypes, RegisterTypes } from "@/type";
import api from "./api";


export const RegisterUser =  (data: RegisterTypes) => api.post("/auth/register", data)
export const LoginUser =  (data: LoginTypes) => api.post<any>("/auth/login", data)