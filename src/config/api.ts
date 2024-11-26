export const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_BASE_URL || 'https://ox-platform-b629bbae8b19.herokuapp.com/api',
  endpoints: {
    balance: '/accounts/{accountId}/balance',
    transactions: '/accounts/{accountId}/transactions',
    menu: '/menu',
  },
};
