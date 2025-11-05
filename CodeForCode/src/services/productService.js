import { BASE_API_URL, getToken } from "@/utils/data";

const productService = {};

productService.getAllProducts = async (params = {}) => {
  const queryParams = new URLSearchParams();

  if (params.category && params.category !== 'All') queryParams.append('category', params.category);
  if (params.search) queryParams.append('search', params.search);
  if (params.sortBy) queryParams.append('sortBy', params.sortBy);
  if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

  const url = `${BASE_API_URL}dashboard/product/all${queryParams.toString() ? '?' + queryParams.toString() : ''}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return await res.json();
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

productService.updateProduct = async (data = {}) => {
  // Simulate fetching all products
  const res = await fetch(
    `${BASE_API_URL}dashboard/product/update/${data.product_id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    }
  );
  return await res.json();
};

productService.deleteProduct = async (data = {}) => {
  // Simulate fetching all products
  const res = await fetch(`${BASE_API_URL}dashboard/product/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
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

export default productService;
