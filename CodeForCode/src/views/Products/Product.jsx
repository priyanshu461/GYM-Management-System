import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import productService from "../../services/productService";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";

const CategoryPill = ({ value, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-xl text-sm font-medium border transition ${
      active ? "bg-teal-100 text-teal-800 border-teal-300" : "bg-teal-50 text-teal-600 border-teal-200 hover:border-teal-300"
    }`}
  >
    {value}
  </button>
);

const Rating = ({ value }) => {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const stars = new Array(5).fill(0).map((_, i) => {
    if (i < full) return "★";
    if (i === full && half) return "☆";
    return "☆";
  });
  return <span className="text-yellow-400 text-sm" aria-label={`Rated ${value}`}>{stars.join(" ")}</span>;
};

const placeholderImage = "https://picsum.photos/300/192?random=1&text=Image+Not+Available";

const getSafeImage = (image) => {
  if (!image) return placeholderImage;
  if (image.includes('via.placeholder.com')) return placeholderImage;
  return image;
};

export default function Product() {
  const navigate = useNavigate();
  const { theme, toggleHighContrast } = useTheme();
  const { user } = useAuth();
  const isAdmin = user?.user_type === "Admin";
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('fitnessCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({
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
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");



  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('fitnessCart', JSON.stringify(cart));
  }, [cart]);

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await productService.deleteProduct(productId);
        if (response.success || response.message === 'Product deleted successfully') {
      // Refresh products list
      const refreshResponse = await productService.getAllProducts({ limit: 1000 });
      if (refreshResponse.success) {
        setProducts(refreshResponse.data);
      }
        } else {
          alert('Failed to delete product');
        }
      } catch (error) {
        alert('Error deleting product');
      }
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setEditFormData({
      name: product.name || "",
      category: product.category || "",
      brand: product.brand || "",
      price: product.price || "",
      mrp: product.mrp || "",
      image: product.image || "",
      rating: product.rating || "",
      flavor: product.flavor || "",
      servings: product.servings || "",
      stock: product.stock || "",
      description: product.description || "",
    });
    setEditError("");
  };

  const handleEditInputChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };



  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError("");

    // Validation
    if (!editFormData.category) {
      setEditError("Category is required");
      setEditLoading(false);
      return;
    }

    try {
      const productData = {
        ...editFormData,
        price: parseFloat(editFormData.price),
        mrp: editFormData.mrp ? parseFloat(editFormData.mrp) : undefined,
        rating: editFormData.rating ? parseFloat(editFormData.rating) : undefined,
        servings: editFormData.servings ? parseInt(editFormData.servings) : undefined,
        stock: editFormData.stock ? parseInt(editFormData.stock) : undefined,
      };

      await productService.updateProduct(editingProduct.id, productData);

      // Refresh products list
      const refreshResponse = await productService.getAllProducts({ limit: 1000 });
      if (refreshResponse.success) {
        setProducts(refreshResponse.data);
      }

      setEditingProduct(null);
    } catch (err) {
      setEditError(err.message || "Failed to update product");
    } finally {
      setEditLoading(false);
    }
  };



  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item.id !== id));
    } else {
      setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
    }
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productService.getAllProducts({ limit: 1000 }); // Fetch up to 1000 products to show all
        if (response.success) {
          setProducts(response.data);
        } else {
          setError(response.message || "Failed to fetch products");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

  const list = useMemo(() => {
    let out = [...products];
    if (category !== "All") out = out.filter(p => p.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      out = out.filter(p => (p.name + " " + p.brand + " " + p.flavor).toLowerCase().includes(q));
    }
    switch (sort) {
      case "price-asc": out.sort((a,b) => a.price - b.price); break;
      case "price-desc": out.sort((a,b) => b.price - a.price); break;
      case "rating": out.sort((a,b) => b.rating - a.rating); break;
      case "stock": out.sort((a,b) => b.stock - a.stock); break;
      default: out.sort((a,b) => (b.rating - a.rating) || (b.stock - a.stock));
    }
    return out;
  }, [products, query, category, sort]);

  const counts = useMemo(() => ({
    total: products.length,
    protein: products.filter(p=>p.category==='Protein').length,
    aminoAcids: products.filter(p=>p.category==='Amino Acids').length,
    preWorkout: products.filter(p=>p.category==='Pre Workout').length,
    intraWorkout: products.filter(p=>p.category==='Intra Workout').length,
    postWorkout: products.filter(p=>p.category==='Post Workout').length,
    multivitamin: products.filter(p=>p.category==='Multivitamin').length,
    oos: products.filter(p=>p.stock===0).length,
  }), [products]);

  if (loading) {
    return (
      <Layout>
        <div className={`min-h-screen ${theme === "dark" ? "bg-teal-900 text-white" : "bg-white text-gray-900"} flex items-center justify-center`}>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading products...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className={`min-h-screen ${theme === "dark" ? "bg-teal-900 text-white" : "bg-white text-gray-900"} flex items-center justify-center`}>
          <div className="text-center">
            <p className="text-red-500 text-lg">Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg"
            >
              Retry
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={`min-h-screen ${theme === "dark" ? "bg-teal-900 text-white" : "bg-white text-gray-900"}`}>
        <div className="mx-auto max-w-7xl px-4 py-8">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-teal-500 to-teal-300 bg-clip-text text-transparent dark:from-teal-400 dark:to-teal-200">Fitness Supplements</h1>
              <p className={`text-gray-600 dark:text-gray-300 text-sm mt-1 font-medium`}>Protein, Amino Acids, Pre, Intra, Post workout, and Multivitamin supplements</p>
            </div>
            <div className="flex gap-2">
              {isAdmin && (
                <button
                  onClick={() => navigate("/products/create")}
                  className="px-3 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium transition-colors"
                >
                  Create Product
                </button>
              )}
              <button onClick={toggleHighContrast} className="px-3 py-2 rounded-lg bg-teal-100 dark:bg-teal-900 border border-teal-300 text-teal-800 dark:text-white text-sm hover:bg-teal-200">High contrast</button>
              <select
                value={sort}
                onChange={(e)=>setSort(e.target.value)}
                className="px-3 py-2 rounded-lg bg-teal-100 dark:bg-teal-900 border border-teal-300 text-teal-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="stock">Stock: High to Low</option>
              </select>
              <button onClick={()=>window.print()} className="px-3 py-2 rounded-lg bg-teal-100 dark:bg-teal-900 border border-teal-300 text-teal-800 dark:text-white text-sm hover:bg-teal-200">Export</button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            <div className="rounded-2xl bg-teal-50 dark:bg-teal-900 border border-teal-200 p-4">
              <p className="text-teal-600 dark:text-teal-300 text-sm font-medium">Total</p>
              <p className="text-2xl font-bold mt-1 text-teal-900 dark:text-white">{counts.total}</p>
            </div>
            <div className="rounded-2xl bg-teal-50 dark:bg-teal-900 border border-teal-200 p-4">
              <p className="text-teal-600 dark:text-teal-300 text-sm font-medium">Protein</p>
              <p className="text-2xl font-bold mt-1 text-teal-900 dark:text-white">{counts.protein}</p>
            </div>
            <div className="rounded-2xl bg-teal-50 dark:bg-teal-900 border border-teal-200 p-4">
              <p className="text-teal-600 dark:text-teal-300 text-sm font-medium">Amino Acids</p>
              <p className="text-2xl font-bold mt-1 text-teal-900 dark:text-white">{counts.aminoAcids}</p>
            </div>
            <div className="rounded-2xl bg-teal-50 dark:bg-teal-900 border border-teal-200 p-4">
              <p className="text-teal-600 dark:text-teal-300 text-sm font-medium">Pre Workout</p>
              <p className="text-2xl font-bold mt-1 text-teal-900 dark:text-white">{counts.preWorkout}</p>
            </div>
            <div className="rounded-2xl bg-teal-50 dark:bg-teal-900 border border-teal-200 p-4">
              <p className="text-teal-600 dark:text-teal-300 text-sm font-medium">Intra Workout</p>
              <p className="text-2xl font-bold mt-1 text-teal-900 dark:text-white">{counts.intraWorkout}</p>
            </div>
            <div className="rounded-2xl bg-teal-50 dark:bg-teal-900 border border-teal-200 p-4">
              <p className="text-teal-600 dark:text-teal-300 text-sm font-medium">Post Workout</p>
              <p className="text-2xl font-bold mt-1 text-teal-900 dark:text-white">{counts.postWorkout}</p>
            </div>
            <div className="rounded-2xl bg-teal-50 dark:bg-teal-900 border border-teal-200 p-4">
              <p className="text-teal-600 dark:text-teal-300 text-sm font-medium">Multivitamin</p>
              <p className="text-2xl font-bold mt-1 text-teal-900 dark:text-white">{counts.multivitamin}</p>
            </div>
            <div className="rounded-2xl bg-teal-50 dark:bg-teal-900 border border-teal-200 p-4">
              <p className="text-teal-600 dark:text-teal-300 text-sm font-medium">Out of Stock</p>
              <p className="text-2xl font-bold mt-1 text-teal-900 dark:text-white">{counts.oos}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-2 flex-wrap">
              {['All','Protein','Amino Acids','Pre Workout','Intra Workout','Post Workout','Multivitamin'].map(t => (
                <CategoryPill key={t} value={t} active={category===t} onClick={()=>setCategory(t)} />
              ))}
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
                placeholder="Search name, brand, flavor"
                className="w-full md:w-96 px-4 py-2 rounded-xl bg-teal-50 dark:bg-teal-900 border border-teal-300 text-teal-800 dark:text-white text-sm placeholder:text-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Grid */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {list.map(p => (
              <li key={p.id} className="group">
                <div className="rounded-2xl overflow-hidden bg-teal-50 dark:bg-teal-900 border border-teal-200 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                  <div className="relative">
                    <img src={getSafeImage(p.image)} alt={p.name} className="h-48 w-full object-cover" loading="lazy" onError={(e) => e.target.src = placeholderImage} />
                    <div className="absolute top-2 left-2 text-xs px-2 py-1 rounded-full bg-gray-800 text-white border border-gray-600">{p.category}</div>
                    {p.stock === 0 && (
                      <div className="absolute top-2 right-2 text-xs px-2 py-1 rounded-full bg-red-500 text-white">Out of stock</div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold leading-tight text-gray-900 dark:text-white">{p.name}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">{p.brand} — {p.flavor}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <Rating value={p.rating} />
                      <span className="text-xs text-gray-600 dark:text-gray-300">{p.servings} servings</span>
                    </div>
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-gray-900 dark:text-white">₹{p.price}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 line-through">₹{p.mrp}</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          disabled={p.stock===0}
                          onClick={()=>addToCart(p)}
                          className="w-full px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {p.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                        {isAdmin && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditProduct(p)}
                              className="flex-1 px-3 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-500 hover:to-teal-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              className="flex-1 px-3 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-teal-700 to-teal-800 hover:from-teal-800 hover:to-teal-900 text-white shadow-md hover:shadow-lg transition-all duration-200"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {list.length === 0 && (
            <div className="text-center text-gray-500 mt-16">No products match your filters.</div>
          )}

          {/* Edit Product Dialog */}
          <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Product</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                {editError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {editError}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-name">Name *</Label>
                    <Input
                      id="edit-name"
                      value={editFormData.name}
                      onChange={(e) => handleEditInputChange('name', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-category">Category *</Label>
                    <Select value={editFormData.category} onValueChange={(value) => handleEditInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Protein">Protein</SelectItem>
                        <SelectItem value="Amino Acids">Amino Acids</SelectItem>
                        <SelectItem value="Pre">Pre Workout</SelectItem>
                        <SelectItem value="Intra">Intra Workout</SelectItem>
                        <SelectItem value="Post">Post Workout</SelectItem>
                        <SelectItem value="Multivitamins">Multivitamin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-brand">Brand</Label>
                    <Input
                      id="edit-brand"
                      value={editFormData.brand}
                      onChange={(e) => handleEditInputChange('brand', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-flavor">Flavor</Label>
                    <Input
                      id="edit-flavor"
                      value={editFormData.flavor}
                      onChange={(e) => handleEditInputChange('flavor', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-price">Price *</Label>
                    <Input
                      id="edit-price"
                      type="number"
                      step="0.01"
                      value={editFormData.price}
                      onChange={(e) => handleEditInputChange('price', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-mrp">MRP</Label>
                    <Input
                      id="edit-mrp"
                      type="number"
                      step="0.01"
                      value={editFormData.mrp}
                      onChange={(e) => handleEditInputChange('mrp', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-rating">Rating</Label>
                    <Input
                      id="edit-rating"
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={editFormData.rating}
                      onChange={(e) => handleEditInputChange('rating', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-servings">Servings</Label>
                    <Input
                      id="edit-servings"
                      type="number"
                      value={editFormData.servings}
                      onChange={(e) => handleEditInputChange('servings', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-stock">Stock</Label>
                    <Input
                      id="edit-stock"
                      type="number"
                      value={editFormData.stock}
                      onChange={(e) => handleEditInputChange('stock', e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="edit-image">Image URL</Label>
                    <Input
                      id="edit-image"
                      value={editFormData.image}
                      onChange={(e) => handleEditInputChange('image', e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="edit-description">Description</Label>
                    <Textarea
                      id="edit-description"
                      value={editFormData.description}
                      onChange={(e) => handleEditInputChange('description', e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setEditingProduct(null)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={editLoading}>
                    {editLoading ? 'Updating...' : 'Update Product'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>



          {/* Cart Section */}
          {cart.length > 0 && (
            <div className="mt-12 bg-teal-50 dark:bg-teal-900 rounded-2xl p-6 border border-teal-200">
              <h2 className="text-2xl font-bold text-teal-900 dark:text-white mb-6">Shopping Cart</h2>
              <div className="space-y-4">
                {cart.map(item => {
                  const itemTotal = item.price * item.quantity;
                  return (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-white dark:bg-teal-800 rounded-xl border border-teal-200">
                      <div className="flex items-center gap-4">
                        <img src={getSafeImage(item.image)} alt={item.name} className="w-16 h-16 object-cover rounded-lg" onError={(e) => e.target.src = placeholderImage} />
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{item.brand} — ₹{item.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-700 text-teal-800 dark:text-white hover:bg-teal-200 dark:hover:bg-teal-600 flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-semibold text-gray-900 dark:text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-700 text-teal-800 dark:text-white hover:bg-teal-200 dark:hover:bg-teal-600 flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-white w-20 text-right">₹{itemTotal}</span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 flex items-center justify-center"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* GST Calculation */}
              <div className="mt-6 border-t border-teal-200 pt-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>Subtotal:</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>CGST (5%):</span>
                    <span>₹{Math.round(cartTotal * 0.05)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>SGST (5%):</span>
                    <span>₹{Math.round(cartTotal * 0.05)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-teal-900 dark:text-white border-t border-teal-300 pt-2">
                    <span>Total:</span>
                    <span>₹{cartTotal + Math.round(cartTotal * 0.05) + Math.round(cartTotal * 0.05)}</span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}

          <div className="mt-8 text-center text-xs text-gray-500">{products.length} products</div>
        </div>
      </div>


    </Layout>
  );
}
