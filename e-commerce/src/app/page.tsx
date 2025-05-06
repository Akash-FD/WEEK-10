"use client";

import { FilterProduct } from "@/lib/api";
import { filterTypes, productDataTypes } from "@/type";
import Image from "next/image";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [productData, setProductData] = useState<productDataTypes[]>([]);
  const [filters, setFilters] = useState<filterTypes>({
    sortBy: "",
    order: "",
    minPrice: "",
    maxPrice: "",
    category: "",
    search: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchAllProduct = async () => {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value);
        }
      });
      const res = await FilterProduct(queryParams.toString());

      
      setProductData(res.data.data);
    } catch (err) {
      console.log("Something went wrong", err);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, [filters]);

  return (
    <div className="flex mx-auto py-8 px-4 gap-6 min-h-screen">
      <div className="w-[280px] bg-white rounded-lg p-5 h-fit sticky top-24">
        <h1 className="text-2xl font-semibold mb-6">Filters</h1>
        <div className="mb-5">
          <label className="text-gray-700 mb-2 block font-semibold">
            Category
          </label>
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          >
            <option value="">All</option>
            <option value="Clothing">Clothing</option>
            <option value="Electronics">Electronics</option>
            <option value="Beauty & Personal Care">
              Beauty & Personal Care
            </option>
            <option value="Sports & Outdoors">Sports & Outdoors</option>
            <option value="Books">Books</option>
            <option value="Toys & Games">Toys & Games</option>
            <option value="Footwear">Footwear</option>
          </select>
        </div>

        <div className="mb-5">
          <label className="text-gray-700  mb-2 block font-semibold">
            Price Range
          </label>
          <div className="flex gap-2">
            <input
              name="minPrice"
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={handleChange}
              className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <input
              name="maxPrice"
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={handleChange}
              className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mb-5">
          <label className="text-gray-700 mb-2 block font-semibold">
            Sort By
          </label>
          <select
            name="sortBy"
            value={filters.sortBy}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="price">Price</option>
            <option value="createdAt">Newest</option>
          </select>
        </div>

        <div className="mb-5">
          <label className="text-gray-700  mb-2 block font-semibold">Order</label>
          <select
            name="order"
            value={filters.order}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>

        <button
          onClick={() =>
            setFilters({
              sortBy: "",
              order: "",
              minPrice: "",
              maxPrice: "",
              category: "",
              search: filters.search,
            })
          }
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition-all"
        >
          Clear Filters
        </button>
      </div>

      <div className="flex-1">
      <input
          type="text"
          name="search"
          placeholder="Search by name"
          value={filters.search}
          onChange={handleChange}
          className="w-[500px] mb-5 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-all"
        />
        {productData?.length === 0 ? (
          <p className="text-center text-xl font-semibold">
            No products found.
          </p>
        ) : (
          <div className="flex flex-wrap justify-start gap-10 items-center">
            {productData?.map((item) => (
              <Link href={`/product/${item.id}`}
                key={item.id}
                className="card w-[250px] overflow-hidden max-lg:w-[200px] max-md:w-[140px] shadow-lg p-4 hover:scale-105 transition-all duration-200"
              >
                <div className="h-[220px] bg-gray-100 flex items-center justify-center overflow-hidden rounded">
                  <Image src={item.images[0]}
                    alt={item.name}
                    width={200}
                    height={200}
                    quality={100}
                    className="min-lg:h-full min-lg:w-full min-lg:object-contain"
                  />
                </div>
                <h2 className="mt-4 font-semibold text-gray-600 text-lg line-clamp-2">
                  {item.name}
                </h2>
            
                <div className="flex justify-between items-center mt-2">
                  <p className="text-lg font-semibold">${item.price}</p>
                </div>
                <button
                  className="w-full mt-4  text-center py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-all"
                >
                  View Details
                </button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
