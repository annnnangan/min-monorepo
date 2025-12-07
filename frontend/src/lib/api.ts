/**
 * API base URL configuration
 * 
 * In production (Render): Uses VITE_API_URL from environment (set by Render)
 *   Example: https://min-monorepo-be.onrender.com
 * In development: Uses '/api' which is proxied to localhost:8000 by Vite
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Get the full API URL for an endpoint
 * @param endpoint - API endpoint path (e.g., '/api/hello')
 * @returns Full URL to the API endpoint
 */
export function getApiUrl(endpoint: string): string {
  // Ensure endpoint starts with /
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  // In production: VITE_API_URL is the full backend URL, just append endpoint
  // In development: API_BASE_URL is empty, so return endpoint (which gets proxied)
  return API_BASE_URL ? `${API_BASE_URL}${cleanEndpoint}` : cleanEndpoint;
}

