"use client";

import { createContext, useContext, useState, ReactNode } from "react";


interface CartContextType {
  cartLength: number;
  setCartLength: (length: number) => void;
  totalAmout: number;
  setTotalAmout: (length: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);


export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartLength, setCartLength] = useState<number>(0);
  const [totalAmout, setTotalAmout] = useState<number>(0);


  return (
    <CartContext.Provider value={{ cartLength, setCartLength,totalAmout,setTotalAmout }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used inside a CartProvider");
  }
  return context;
};