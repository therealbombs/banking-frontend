import { api } from './api';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

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

  exportToPDF: (transactions: Transaction[]) => {
    const doc = new jsPDF();
    
    // Header
    doc.text('Transactions Report', 10, 10);
    
    // Data
    let y = 20;
    transactions.forEach((transaction) => {
      doc.text(`${transaction.dateTime} - ${transaction.description} - ${transaction.amount}`, 10, y);
      y += 10;
    });
    
    doc.save('transactions.pdf');
  },

  exportToExcel: (transactions: Transaction[]) => {
    const ws = XLSX.utils.json_to_sheet(transactions);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Transactions');
    XLSX.writeFile(wb, 'transactions.xlsx');
  }
};