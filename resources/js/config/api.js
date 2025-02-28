
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost/api";

export const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  });
