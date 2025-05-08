"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import {  allProductTypes } from "@/type";

type ProductContextType = {
  editData: allProductTypes | null;
  setEditData: (data: allProductTypes | null) => void;
  productId: number | null;
  setProductId: (id: number | null) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [editData, setEditData] = useState<allProductTypes | null>(null);
  const [productId, setProductId] = useState<number | null>(null);
  
  return (
    <ProductContext.Provider  value={{ editData, setEditData, productId, setProductId }} >
      {children}
    </ProductContext.Provider>
  );
};

export const useEditProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useEditProduct must be used within ProductProvider");
  }
  return context;
};
