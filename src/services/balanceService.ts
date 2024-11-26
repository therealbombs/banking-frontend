import { api } from './api';

export interface Balance {
  availableBalance: number;
  accountingBalance: number;
  lastUpdate: string;
  blockedAmount: number;
}

export const balanceService = {
  getBalance: async (accountId: string): Promise<Balance> => {
    const { data } = await api.get(`/accounts/${accountId}/balance`);
    return data;
  },
  
  // Funzione per anonimizzare i saldi
  anonymizeBalance: (balance: Balance): Balance => ({
    ...balance,
    availableBalance: -1,
    accountingBalance: -1,
    blockedAmount: -1,
  }),
};