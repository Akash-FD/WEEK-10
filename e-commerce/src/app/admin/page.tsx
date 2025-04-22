"use client";

import React from "react";
import { useState } from "react";
import type { adminForm } from "@/type";
import { addProduct } from "@/lib/auth";

export default function adminForm() {
  const [formData, setFormData] = useState<adminForm>({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    images: [],
  });
  console.log(formData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Add your form submission logic here
    console.log(formData);

    // post request to add product
    try {
      await addProduct(formData);
      alert("product added successfully");
    } catch (err) {
      alert("not added");
      console.log(err);
    }
  };

  return (
    <div className="flex w-full">
    <div className="flex flex-[1] items-start border">
        <button>add product</button>

    </div>
      <div className="flex flex-[4] bg-gradient-to-t from-white py-6 pb-20">
        <div className=" w-[450px] max-sm:w-[300px] max-sm:pt-3 max-sm:my-4 m-auto px-10 my-10 bg-white py-8 shadow-lg shadow-neutral-500 rounded-xl">
          <h2 className="text-3xl pb-4 text-blue-500">add products</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            name:{" "}
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              className="py-2 px-2 border border-gray-300"
              value={formData.name}
              onChange={handleChange}
            />
            description:
            <input
              type="text"
              name="description"
              placeholder="Enter your description"
              required
              className="py-2 px-2 border border-gray-300"
              value={formData.description}
              onChange={handleChange}
            />
            price:
            <input
              type="number"
              name="price"
              placeholder="Enter your price"
              required
              className="py-2 px-2 border border-gray-300"
              value={formData.price}
              onChange={handleChange}
            />
            quantity:
            <input
              type="number"
              name="quantity"
              placeholder="Enter your quantity"
              required
              className="py-2 px-2 border border-gray-300"
              value={formData.quantity}
              onChange={handleChange}
            />
            images:
            <input
              type="file"
              name="images"
              className="border border-gray-300"
              value={formData.images}
              onChange={handleChange}
            />
            <button className="bg-blue-600 text-white px-5 my-1 py-2 rounded-lg w-full m-auto hover:bg-blue-700">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
