"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Step 1: Define the shape (Type) of your context
interface CartContextType {
  cartLength: number;
  setCartLength: (length: number) => void;
  totalAmout: number;
  setTotalAmout: (length: number) => void;
}

// Step 2: Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Step 3: Create Provider
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartLength, setCartLength] = useState<number>(0);
  const [totalAmout, setTotalAmout] = useState<number>(0);


  return (
    <CartContext.Provider value={{ cartLength, setCartLength,totalAmout,setTotalAmout }}>
      {children}
    </CartContext.Provider>
  );
};

// Step 4: Custom hook to use context easily
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used inside a CartProvider");
  }
  return context;
};