import productService from "@/services/productService";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCreate({ open, setOpen, product, onSave }) {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    category: "",
    price: "",
  });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (product) {
      setData({
        name: product.name || "",
        category: product.category || "",
        price: product.price || "",
      });
      setIsActive(product.isActive || false);
    } else {
      setData({ name: "", category: "", price: "" });
      setIsActive(false);
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onSave) {
      onSave({ ...data, isActive });
    } else {
      await productService.createProduct(data);
      setOpen(false);
    }
    // Redirect to ProductIndex after creation
    navigate('/products/index');
  };

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Modal Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          {/* Modal Content */}
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              X
            </button>

            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {product ? "Edit Product" : "Create Product"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  onChange={(e) => onChange(e)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Category
                </label>
                <input
                  type="text"
                  placeholder="Enter your category"
                  name="category"
                  onChange={(e) => onChange(e)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Price
                </label>
                <input
                  type="text"
                  placeholder="Enter your price"
                  name="price"
                  onChange={(e) => onChange(e)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Switch */}
              <div className="flex items-center justify-between">
                <label className="text-gray-700 font-medium">Is Active</label>
                <button
                  type="button"
                  onClick={() => setIsActive(!isActive)}
                  className={`relative w-14 h-8 flex items-center rounded-full transition-colors duration-300 ${
                    isActive ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                      isActive ? "translate-x-6" : ""
                    }`}
                  ></span>
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
