// src/components/AccountSelector.tsx
import { 
  Box, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Typography 
} from '@mui/material';
import { useAuthStore } from '@/store/useAuthStore';

export const AccountSelector = () => {
  const { accounts, selectedAccount, setSelectedAccount } = useAuthStore();

  if (!accounts.length) return null;

  return (
    <FormControl fullWidth>
      <InputLabel>Seleziona Conto</InputLabel>
      <Select
        value={selectedAccount?.accountNumber || ''}
        onChange={(e) => {
          const account = accounts.find(a => a.accountNumber === e.target.value);
          if (account) setSelectedAccount(account);
        }}
        label="Seleziona Conto"
      >
        {accounts.map((account) => (
          <MenuItem 
            key={account.accountNumber} 
            value={account.accountNumber}
          >
            <Box>
              <Typography variant="subtitle1">
                {account.name}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {account.accountNumber} - {account.type}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};