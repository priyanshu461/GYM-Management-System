export const BASE_API_URL = "http://localhost:8080/api/";

// Get token dynamically instead of at module level
export const getToken = () => localStorage.getItem("token");

// Legacy compatibility export - DEPRECATED: Use getToken() instead
export const TOKEN = getToken();
