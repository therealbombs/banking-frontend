import { api } from './api';
import type { User, Account } from '@/store/useAuthStore';

interface LoginResponse {
  customerId: string;
  firstName: string;
  lastName: string;
  type: string;
  preferredLanguage: string;
  lastLogin: string;
  accounts: Account[];
  token: string;
}

export const authService = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    const { data } = await api.post('/auth/login', { username, password });
    return data;
  }
};