import { api } from './api';

export interface Transaction {
  id: number;
  amount: number;
  dateTime: string;
  description: string;
}

export interface TransactionFilters {
  fromDate?: string;
  toDate?: string;
  page: number;
  size: number;
}

export const transactionService = {
  getTransactions: async (accountId: string, filters: TransactionFilters) => {
    const { data } = await api.get(`/accounts/${accountId}/transactions`, {
      params: filters,
    });
    return data;
  },

  exportToPDF: async (transactions: Transaction[]) => {
    // Implementazione export PDF
  },

  exportToExcel: async (transactions: Transaction[]) => {
    // Implementazione export Excel
  },
};