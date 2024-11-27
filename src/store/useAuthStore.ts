import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Account } from '../types/auth';

interface AuthState {
  user: User | null;
  accounts: Account[];
  selectedAccount: Account | null;
  setUser: (user: User | null) => void;
  setAccounts: (accounts: Account[]) => void;
  setSelectedAccount: (account: Account) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accounts: [],
      selectedAccount: null,
      setUser: (user) => set({ user }),
      setAccounts: (accounts) => set({ 
        accounts,
        selectedAccount: accounts.find(a => a.primary) || accounts[0] 
      }),
      setSelectedAccount: (account) => set({ selectedAccount: account }),
      logout: () => set({ user: null, accounts: [], selectedAccount: null })
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        accounts: state.accounts,
        selectedAccount: state.selectedAccount 
      })
    }
  )
);