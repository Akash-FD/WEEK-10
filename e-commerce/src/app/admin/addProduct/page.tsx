"use client";
import React, { useEffect, useState } from "react";
import { addProduct, EditProduct } from "@/lib/api"; 
import { adminForm } from "@/type";
import { useEditProduct } from "@/context/ProductContext";
import { useRouter } from "next/navigation";


const ProductForm = () => {

  const {editData, setEditData, productId, setProductId} =useEditProduct()

  const router = useRouter()

  const [formData, setFormData] = useState<adminForm>({
    name: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
    images: [],
  });

  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    if (productId) {
      setFormData({
        name: editData?.name || "",
        description: editData?.description || "",
        category: editData?.category || "",
        price: editData?.price || "",
        quantity: editData?.quantity || "",
        images: [],
      })
      
    }
    
  }, [productId])
  

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData((prevState) => ({
        ...prevState,
        images: [...prevState.images, ...files], 
      }));
    }
  };
  const removeImage = (index: number) => {
    setFormData((prevState) => ({
      ...prevState,
      images: prevState.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("description", formData.description);
    formDataObj.append("category", formData.category);

    formDataObj.append("price", formData.price);
    formDataObj.append("quantity", formData.quantity);
    formData.images.forEach((image) => {
    formDataObj.append("images", image);
    });

    // const formDataObj:adminForm = {
    //   name: formData.name,
    //   description: formData.description,
    //   price: formData.price,
    //   quantity: formData.quantity,
    //   images: formData.images,
    // }
    // console.log(formDataObj);
    
    try
     {
      if(productId){
        const response = await EditProduct(formDataObj, productId);
        console.log("Product added:", response.data);
        alert("Product added successfully!");
        router.push("/admin/allProducts")
      
      }else{

        const response = await addProduct(formDataObj);
        console.log("Product added:", response.data);
        alert("Product added successfully!");
        router.push("/admin/allProducts")
      }
     
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Error adding product. Please try again.");
    } finally {
      setLoading(false);
      setFormData({
        name: "",
        description: "",
        category:"",
        price: "",
        quantity: "",
        images: [],
      });
      setProductId(null)
    }


  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Product Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product description"
            required
          />
        </div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Category
          </label>
        <select name="category" id="category" onChange={handleChange} className="w-full p-2 border rounded">
        <option value="">Select Category</option>
        <option value="Clothing">Clothing</option>
        <option value="Electronics">Electronics</option>
        <option value="Beauty & Personal Care">Beauty & Personal Care</option>
        <option value="Sports & Outdoors">Sports & Outdoors</option>
        <option value="Books">Books</option>
        <option value="Toys & Games">Toys & Games</option>
        <option value="Footwear">Footwear</option>
        </select>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product price"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product quantity"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">
            Product Images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            onChange={handleFileChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {formData.images.length > 0 && (
          <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-4">
            {formData.images.map((img, index) => (
              <div key={index} className="relative w-full h-32 border rounded-lg overflow-hidden shadow-sm">
                <img
                  src={URL.createObjectURL(img)}
                  alt={`preview-${index}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-600 text-white text-lg rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700 transition"
                >
                  x
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;