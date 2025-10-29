import { BASE_API_URL, TOKEN } from "@/Utils/data";

const productService = {};

productService.getAllProducts = async (data = {}) => {
  // Simulate fetching all products
  const res = await fetch(`${BASE_API_URL}dashboard/product/all`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    data: json.stringify(data),
  });
  return await res.json();
};

productService.createProduct = async (data = {}) => {
  // Simulate fetching all products
  const res = await fetch(`${BASE_API_URL}dashboard/product/create`, {
    method: "POST",
    headers: {
      "Content-Type": "mulptipart/form-data",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: data,
  });
  return await res.json();
};

productService.updateProduct = async (data = {}) => {
  // Simulate fetching all products
  const res = await fetch(
    `${BASE_API_URL}dashboard/product/update/${data.product_id}`,
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
      data: json.stringify(data),
    }
  );
  return await res.json();
};

productService.deleteProduct = async (data = {}) => {
  // Simulate fetching all products
  const res = await fetch(`${BASE_API_URL}dashboard/product/delete`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    data: json.stringify(data),
  });
  return await res.json();
};

productService.getProduct = async (data = {}) => {
  // Simulate fetching all products
  const res = await fetch(`${BASE_API_URL}dashboard/product/get`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    data: json.stringify(data),
  });
  return await res.json();
};

export default productService;
