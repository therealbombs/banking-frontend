export interface Account {
  accountNumber: string;
  name: string;
  type: string;
  primary: boolean;
  attributes: Record<string, string>;
}

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