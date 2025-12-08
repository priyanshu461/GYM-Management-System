const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getTopRatedProducts,
  searchProducts,
  getCategories,
  getBrands
} = require('../controllers/ProductController');

// GET /api/products - Get all products with filtering and pagination
router.get('/all', getAllProducts);

// GET /api/products/search - Search products
router.get('/search', searchProducts);

// GET /api/products/top-rated - Get top rated products
router.get('/top-rated', getTopRatedProducts);

// GET /api/products/category/:category - Get products by category
router.get('/category/:category', getProductsByCategory);

// GET /api/products/categories - Get all categories
router.get('/categories', getCategories);

// GET /api/products/brands - Get all brands
router.get('/brands', getBrands);

// GET /api/products/:id - Get single product
router.get('/:id', getProductById);

// POST /api/products - Create new product
router.post('/create', createProduct);

// PUT /api/products/:id - Update product
router.put('/:id', updateProduct);

// DELETE /api/products/:id - Delete product (soft delete)
router.delete('/:id', deleteProduct);

module.exports = router;
