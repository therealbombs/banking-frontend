export const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_BASE_URL || 'https://ox-platform-b629bbae8b19.herokuapp.com/api',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://ox-frontend-47b0c222d86c.herokuapp.com'
  }
};