export const BASE_API_URL = "http://localhost:8080/api/";

/**
 * Get authentication token from localStorage
 * @returns {string|null} The authentication token or null if not found
 */
export const getToken = () => {
  try {
    // Check if localStorage is available
    if (typeof Storage === "undefined" || typeof localStorage === "undefined") {
      return null;
    }
    return localStorage.getItem("token");
  } catch (error) {
    // Handle cases where localStorage access is restricted
    console.warn("Unable to access localStorage:", error.message);
    return null;
  }
};

