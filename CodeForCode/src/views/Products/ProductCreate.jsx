import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { useTheme } from "../../contexts/ThemeContext";
import productService from "../../services/productService";

const ProductCreate = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    price: "",
    mrp: "",
    image: "",
    rating: "",
    flavor: "",
    servings: "",
    stock: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    "Protein",
    "Amino Acids",
    "Pre Workout",
    "Intra Workout",
    "Post Workout",
    "Multivitamin",
    "Other"
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (!formData.category) {
      setError("Category is required");
      setLoading(false);
      return;
    }

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        mrp: formData.mrp ? parseFloat(formData.mrp) : undefined,
        rating: formData.rating ? parseFloat(formData.rating) : undefined,
        servings: formData.servings ? parseInt(formData.servings) : undefined,
        stock: formData.stock ? parseInt(formData.stock) : undefined,
      };

      await productService.createProduct(productData);

      // Reset form
      setFormData({
        name: "",
        category: "",
        brand: "",
        price: "",
        mrp: "",
        image: "",
        rating: "",
        flavor: "",
        servings: "",
        stock: "",
        description: "",
      });

      navigate("/products");
      if (window.opener && window.opener.refreshProducts) {
        window.opener.refreshProducts();
      }
    } catch (err) {
      setError(err.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className={`min-h-screen ${theme === "dark" ? "bg-teal-900 text-white" : "bg-white text-gray-900"}`}>
        <div className="mx-auto max-w-4xl px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-teal-500 to-teal-300 bg-clip-text text-transparent dark:from-teal-400 dark:to-teal-200">Create New Product</h1>
            <p className={`text-gray-600 dark:text-gray-300 text-sm mt-1 font-medium`}>Add a new fitness supplement to your inventory</p>
          </div>

          <div className="bg-teal-50 dark:bg-teal-900 rounded-2xl p-6 border border-teal-200">
            <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className={theme === "dark" ? "text-white" : "text-gray-700"}>
                Product Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                className={theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className={theme === "dark" ? "text-white" : "text-gray-700"}>
                Category *
              </Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger className={theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : ""}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="brand" className={theme === "dark" ? "text-white" : "text-gray-700"}>
                Brand
              </Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => handleInputChange("brand", e.target.value)}
                className={theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="flavor" className={theme === "dark" ? "text-white" : "text-gray-700"}>
                Flavor
              </Label>
              <Input
                id="flavor"
                value={formData.flavor}
                onChange={(e) => handleInputChange("flavor", e.target.value)}
                className={theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : ""}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price" className={theme === "dark" ? "text-white" : "text-gray-700"}>
                Price *
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                required
                className={theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mrp" className={theme === "dark" ? "text-white" : "text-gray-700"}>
                MRP
              </Label>
              <Input
                id="mrp"
                type="number"
                step="0.01"
                value={formData.mrp}
                onChange={(e) => handleInputChange("mrp", e.target.value)}
                className={theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating" className={theme === "dark" ? "text-white" : "text-gray-700"}>
                Rating
              </Label>
              <Input
                id="rating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={(e) => handleInputChange("rating", e.target.value)}
                className={theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : ""}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="servings" className={theme === "dark" ? "text-white" : "text-gray-700"}>
                Servings
              </Label>
              <Input
                id="servings"
                type="number"
                value={formData.servings}
                onChange={(e) => handleInputChange("servings", e.target.value)}
                className={theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock" className={theme === "dark" ? "text-white" : "text-gray-700"}>
                Stock
              </Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => handleInputChange("stock", e.target.value)}
                className={theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : ""}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" className={theme === "dark" ? "text-white" : "text-gray-700"}>
              Image URL
            </Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => handleInputChange("image", e.target.value)}
              className={theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : ""}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className={theme === "dark" ? "text-white" : "text-gray-700"}>
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
              className={theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : ""}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/products")}
              className={theme === "dark" ? "border-gray-600 text-white hover:bg-gray-700" : ""}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              {loading ? "Creating..." : "Create Product"}
            </Button>
          </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductCreate;
