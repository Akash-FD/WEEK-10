"use client";
import { useCartContext } from "@/context/CartContext";
import { AddProductCart, GetCartDetails, ProductInfo } from "@/lib/api";
import { addtocart, allProductTypes } from "@/type";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";

const ProductInfoPage = () => {
  const params = useParams();
  const [productDataById, setProductDataById] = useState<allProductTypes | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const {setCartLength} = useCartContext()
  const router = useRouter()


  const CartData: addtocart = {
    productId: Number(params.id),
    quantity: quantity,
  };
  useEffect(() => {
    const fetchId = async () => {
      try {
        const res = await ProductInfo(Number(params.id));
       
        if (res.status === 200) {
          setProductDataById(res.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchId();
  }, [params.id]);
 

  const handleAddToCart = async () => {
    if (localStorage.getItem('token')) {
      try {
        await AddProductCart(CartData);
        toast.success("Add to Cart successfully", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
   
          const cartres = await GetCartDetails();
          setCartLength(cartres.data?.items?.length);
  
      } catch (err) {
        console.log("somthng went wrong", err);
      }  
    }else{
      alert('You have to Login first')
      router.push("/login")
    }
   
  };

  return (
    <div className="min-h-screen">
      <div className="container w-full mx-auto pt-5">
          <div className="flex flex-wrap gap-5 justify-center items-start">
            <div className="flex gap-8 ">
                {productDataById && 
              <div className="display">
                <Image
                  src={productDataById?.images[0]}
                  alt={productDataById?.name}
                  width={100}
                  height={100}
                  quality={95}
                  priority={true}
                  className="w-[80px] mb-3"
                />
                 <Image
                  src={productDataById?.images[0]}
                  alt={productDataById?.name}
                  width={100}
                  height={100}
                  quality={95}
                  priority={true}
                  className="w-[80px] mb-3"
                />
                 <Image
                  src={productDataById?.images[0]}
                  alt={productDataById?.name}
                  width={100}
                  height={100}
                  quality={95}
                  priority={true}
                  className="w-[80px] mb-3"
                />
                 <Image
                  src={productDataById?.images[0]}
                  alt={productDataById?.name}
                  width={100}
                  height={100}
                  quality={95}
                  priority={true}
                  className="w-[80px]"
                />
              </div>
              }
              <div className="w-[352px]">
                
                {productDataById && <Image src={productDataById?.images[0]} alt={productDataById?.name} width={300} height={300} quality={95} priority={true} className="w-full h-full object-contain" />}
              </div>
            </div>
          
              <div className="flex flex-col gap-5 ">
                <h2 className="text-3xl font-semibold">
                  {productDataById?.name}
                </h2>
                <p className="">{productDataById?.description}</p>
                <div className="flex">
                  <p className="text-xl line-through text-red-500 ">
                    $ {productDataById?.price}
                  </p>
                  <p className="ml-3 text-xl">
                    $ {productDataById?.price}
                  </p>
                </div>
                <div className="flex items-center">
                  <button
                    className="bg-black text-white px-2 text-lg"
                    onClick={() => {
                      if (quantity > 1) setQuantity(quantity - 1);
                    }}
                  >
                    -
                  </button>
                  <p className="bg-gray-200 px-2">{quantity}</p>
                  <button
                    className="bg-black text-white px-2 text-lg"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="py-2 w-[180px] px-5 text-md text-white bg-black max-sm:text-sm max-sm:w-[120px]"
                  onClick={handleAddToCart}
                >
                  Add to cart
                </button>
              </div>
         
          </div>
        </div>
        <ToastContainer/>
      </div>
    
  );
};

export default ProductInfoPage;
