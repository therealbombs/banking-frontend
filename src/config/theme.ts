import { createTheme } from '@mui/material/styles';

export const createAppTheme = (mode: 'light' | 'dark') => createTheme({
  palette: {
    mode,
    primary: {
      main: '#1976d2',
      // Personalizzabile per brand
    },
    secondary: {
      main: '#dc004e',
      // Personalizzabile per brand
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    // Personalizzabile per brand
  },
  components: {
    // Personalizzazioni componenti MUI
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});