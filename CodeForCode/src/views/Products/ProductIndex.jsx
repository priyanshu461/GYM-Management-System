import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { useTheme } from "../../contexts/ThemeContext";
import productService from "../../services/productService";
import ProductCreate from "./ProductCreate";
import { PRODUCTS } from "./Product";

export default function ProductIndex() {
  const { theme } = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCreate, setOpenCreate] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await productService.getAllProducts();
      setProducts(res.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      // Fallback to static data from Product.jsx
      setProducts(PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await productService.deleteProduct({ product_id: id });
        setProducts(products.filter(p => p.id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setOpenCreate(true);
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setOpenCreate(true);
  };

  const handleSave = async (data) => {
    if (editingProduct) {
      try {
        await productService.updateProduct({ ...data, product_id: editingProduct.id });
        fetchProducts(); // Refresh list
      } catch (error) {
        console.error("Error updating product:", error);
      }
    } else {
      try {
        await productService.createProduct(data);
        fetchProducts(); // Refresh list
      } catch (error) {
        console.error("Error creating product:", error);
      }
    }
    setOpenCreate(false);
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-xl">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={`min-h-screen ${theme === "dark" ? "bg-teal-900 text-white" : "bg-white text-gray-900"}`}>
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Products Index</h1>
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              Create Product
            </button>
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Back
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-teal-800 border border-gray-300 dark:border-teal-600">
              <thead>
                <tr className="bg-gray-100 dark:bg-teal-700">
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Price</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-teal-600">
                    <td className="px-4 py-2 border">{product.id}</td>
                    <td className="px-4 py-2 border">{product.name}</td>
                    <td className="px-4 py-2 border">₹{product.price}</td>
                    <td className="px-4 py-2 border flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ProductCreate
        open={openCreate}
        setOpen={setOpenCreate}
        product={editingProduct}
        onSave={handleSave}
      />
    </Layout>
  );
}
