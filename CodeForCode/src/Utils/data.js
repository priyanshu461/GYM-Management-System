export const BASE_API_URL = "http://localhost:8080/api/";

/**
 * Get authentication token from localStorage
 * @returns {string|null} The authentication token or null if not found
 */
export const getToken = () => localStorage.getItem("token");

