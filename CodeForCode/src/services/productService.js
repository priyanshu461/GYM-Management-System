import { BASE_API_URL, getToken } from "../Utils/data";

const productService = {};

productService.getAllProducts = async (params = {}) => {
  const queryParams = new URLSearchParams();

  if (params.category && params.category !== 'All') queryParams.append('category', params.category);
  if (params.search) queryParams.append('search', params.search);
  if (params.sortBy) queryParams.append('sortBy', params.sortBy);
  if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
  if (params.limit) queryParams.append('limit', params.limit);

  const url = `${BASE_API_URL}products/all${queryParams.toString() ? '?' + queryParams.toString() : ''}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  const data = await res.json();

  // Transform the response to match expected format
  if (data.products) {
    return {
      success: true,
      data: data.products.map(product => ({
        id: product._id,
        name: product.name,
        category: product.category,
        brand: product.brand,
        price: product.price,
        mrp: product.mrp,
        image: product.image,
        flavor: product.flavor || '',
        rating: product.rating || 0,
        stock: product.stock || 0,
        servings: product.servings || 0,
        description: product.description || '',
      })),
    };
  }

  return {
    success: false,
    message: data.message || 'Failed to fetch products',
  };
};

productService.createProduct = async (data = {}) => {
  const res = await fetch(`${BASE_API_URL}dashboard/product/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};

productService.updateProduct = async (id, data = {}) => {
  const res = await fetch(`${BASE_API_URL}products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};

productService.deleteProduct = async (id) => {
  const res = await fetch(`${BASE_API_URL}products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return await res.json();
};

productService.getProduct = async (data = {}) => {
  // Simulate fetching all products
  const res = await fetch(`${BASE_API_URL}dashboard/product/get`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};

productService.getCategories = async () => {
  const res = await fetch(`${BASE_API_URL}products/categories`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  const data = await res.json();

  if (data.categories) {
    return {
      success: true,
      data: data.categories,
    };
  }

  return {
    success: false,
    message: data.message || 'Failed to fetch categories',
  };
};

productService.getBrands = async () => {
  const res = await fetch(`${BASE_API_URL}products/brands`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  const data = await res.json();

  if (data.brands) {
    return {
      success: true,
      data: data.brands,
    };
  }

  return {
    success: false,
    message: data.message || 'Failed to fetch brands',
  };
};

export default productService;
