// src/components/features/home/Home.tsx
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Grid, IconButton, ToggleButton } from '@mui/material';
import { VisibilityOff, Visibility, GetApp } from '@mui/icons-material';
import { OxCard } from '../../base/OxCard';
import { OxDataGrid } from '../../base/OxDataGrid';
import { balanceService } from '../../../services/balanceService';
import { transactionService } from '../../../services/transactionService';

export const Home = () => {
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);
  const [filters, setFilters] = useState({
    fromDate: null,
    toDate: null,
    page: 0,
    size: 10
  });

  const { data: balance } = useQuery(
    ['balance'],
    () => balanceService.getBalance('dummy-account-id'),
    {
      select: data => isBalanceHidden ? balanceService.anonymizeBalance(data) : data
    }
  );

  const { data: transactions } = useQuery(
    ['transactions', filters],
    () => transactionService.getTransactions('dummy-account-id', filters)
  );

  const handleExportPDF = () => {
    transactionService.exportToPDF(transactions);
  };

  const handleExportExcel = () => {
    transactionService.exportToExcel(transactions);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <OxCard>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h6">Available Balance</Typography>
                <Typography variant="h4">
                  {balance?.availableBalance.toLocaleString('it-IT', { 
                    style: 'currency', 
                    currency: 'EUR' 
                  })}
                </Typography>
              </Box>
              <IconButton onClick={() => setIsBalanceHidden(!isBalanceHidden)}>
                {isBalanceHidden ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Box>
          </OxCard>
        </Grid>

        <Grid item xs={12}>
          <OxCard>
            <Box sx={{ p: 2 }}>
              <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Transactions</Typography>
                <Box>
                  <IconButton onClick={handleExportPDF}>
                    <GetApp />
                  </IconButton>
                  <IconButton onClick={handleExportExcel}>
                    <GetApp />
                  </IconButton>
                </Box>
              </Box>
              
              <OxDataGrid
                rows={transactions || []}
                columns={[
                  { field: 'dateTime', headerName: 'Date', width: 200 },
                  { field: 'description', headerName: 'Description', width: 300 },
                  { 
                    field: 'amount', 
                    headerName: 'Amount', 
                    width: 150,
                    valueFormatter: (params) => 
                      params.value.toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'EUR'
                      })
                  }
                ]}
                pageSize={filters.size}
                onPageChange={(newPage) => setFilters(prev => ({ ...prev, page: newPage }))}
                filterMode="server"
                paginationMode="server"
              />
            </Box>
          </OxCard>
        </Grid>
      </Grid>
    </Box>
  );
};