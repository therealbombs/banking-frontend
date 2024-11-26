import { create } from 'zustand';
import { MenuItem } from '@/types/menu';

interface AppState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  menuItems: MenuItem[];
  setMenuItems: (items: MenuItem[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'light',
  setTheme: (theme) => set({ theme }),
  menuItems: [],
  setMenuItems: (items) => set({ menuItems: items }),
}));