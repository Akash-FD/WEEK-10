"use client";

import { FilterProduct } from "@/lib/api";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [productData, setProductData] = useState<any[]>([]);
  const [filters, setFilters] = useState({
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
      setProductData(res.data.products || res.data.data);
    } catch (err) {
      console.log("Something went wrong", err);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, [filters]);

  return (
    <div className="flex mx-auto py-8 px-4 gap-6">
      <div className="w-[280px] bg-white rounded-lg shadow-md p-5 h-fit sticky top-24">
        <h1 className="text-2xl font-semibold mb-6">Filters</h1>

        <input
          type="text"
          name="search"
          placeholder="Search by name"
          value={filters.search}
          onChange={handleChange}
          className="w-full mb-5 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-all"
        />

        <div className="mb-5">
          <label className="text-gray-700 font-medium mb-2 block">
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
          <label className="text-gray-700 font-medium mb-2 block">
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
          <label className="text-gray-700 font-medium mb-2 block">
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
          <label className="text-gray-700 font-medium mb-2 block">Order</label>
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
              search: "",
            })
          }
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition-all"
        >
          Clear Filters
        </button>
      </div>

      <div className="flex-1">
        {productData.length === 0 ? (
          <p className="text-center text-xl font-semibold">
            No products found.
          </p>
        ) : (
          <div className="flex flex-wrap justify-start gap-10 items-center">
            {productData.map((item) => (
              <div
                key={item.id}
                className="card w-[250px] max-lg:w-[200px] max-md:w-[140px] shadow-lg p-4 hover:scale-105 transition-all duration-200"
              >
                <div className="h-[220px] bg-gray-100 flex items-center justify-center overflow-hidden rounded">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <h2 className="mt-4 font-semibold text-gray-600 text-lg line-clamp-2">
                  {item.name}
                </h2>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-lg font-bold">${item.price}</p>
                </div>
                <Link
                  href={`/product/${item.id}`}
                  className="mt-4 block text-center py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-all"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
