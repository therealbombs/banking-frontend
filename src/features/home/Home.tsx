// src/components/features/home/Home.tsx
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
 Box, 
 Grid, 
 IconButton, 
 Typography,
 useTheme
} from '@mui/material';
import { 
 VisibilityOff, 
 Visibility, 
 GetApp,
 FileDownload 
} from '@mui/icons-material';
import { OxCard } from '@/components/base/OxCard';
import { OxDataGrid } from '@/components/base/OxDataGrid';
import { GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';
import { balanceService, type Balance } from '@/services/balanceService';
import { transactionService, type TransactionFilters } from '@/services/transactionService';
import { format } from 'date-fns';

export const Home = () => {
 const theme = useTheme();
 const [isBalanceHidden, setIsBalanceHidden] = useState(false);
 const [filters, setFilters] = useState<TransactionFilters>({
   fromDate: undefined,
   toDate: undefined,
   page: 0,
   size: 10
 });

 const { data: balance, isLoading: balanceLoading } = useQuery(
   ['balance'],
   () => balanceService.getBalance('dummy-account-id'),
   {
     select: data => isBalanceHidden ? balanceService.anonymizeBalance(data) : data
   }
 );

 const { data: transactions, isLoading: transactionsLoading } = useQuery(
   ['transactions', filters],
   () => transactionService.getTransactions('dummy-account-id', filters)
 );

 const columns: GridColDef[] = [
   { 
     field: 'dateTime', 
     headerName: 'Date', 
     width: 180,
     valueFormatter: (params: GridValueFormatterParams) => 
       format(new Date(params.value), 'dd/MM/yyyy HH:mm')
   },
   { 
     field: 'description', 
     headerName: 'Description', 
     width: 300,
     flex: 1
   },
   { 
     field: 'amount', 
     headerName: 'Amount', 
     width: 150,
     align: 'right',
     headerAlign: 'right',
     valueFormatter: (params: GridValueFormatterParams) => 
       new Intl.NumberFormat('it-IT', {
         style: 'currency',
         currency: 'EUR'
       }).format(params.value)
   }
 ];

 const handleExportPDF = () => {
   if (transactions) {
     transactionService.exportToPDF(transactions);
   }
 };

 const handleExportExcel = () => {
   if (transactions) {
     transactionService.exportToExcel(transactions);
   }
 };

 const formatCurrency = (amount: number) => {
   return new Intl.NumberFormat('it-IT', {
     style: 'currency',
     currency: 'EUR'
   }).format(amount);
 };

 return (
   <Box sx={{ p: 3 }}>
     <Grid container spacing={3}>
       {/* Balance Card */}
       <Grid item xs={12} md={6} lg={4}>
         <OxCard>
           <Box sx={{ p: 3 }}>
             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
               <Typography variant="h6" color="textSecondary">
                 Available Balance
               </Typography>
               <IconButton 
                 onClick={() => setIsBalanceHidden(!isBalanceHidden)}
                 size="small"
               >
                 {isBalanceHidden ? <VisibilityOff /> : <Visibility />}
               </IconButton>
             </Box>
             
             {balanceLoading ? (
               <Typography>Loading...</Typography>
             ) : balance ? (
               <>
                 <Typography variant="h4" component="div" sx={{ mb: 1 }}>
                   {formatCurrency(balance.availableBalance)}
                 </Typography>
                 <Typography variant="body2" color="textSecondary">
                   Last updated: {format(new Date(balance.lastUpdate), 'dd/MM/yyyy HH:mm')}
                 </Typography>
               </>
             ) : null}
           </Box>
         </OxCard>
       </Grid>

       {/* Transactions Card */}
       <Grid item xs={12}>
         <OxCard>
           <Box sx={{ p: 3 }}>
             <Box sx={{ 
               display: 'flex', 
               justifyContent: 'space-between', 
               alignItems: 'center', 
               mb: 3 
             }}>
               <Typography variant="h6" color="textSecondary">
                 Recent Transactions
               </Typography>
               <Box>
                 <IconButton 
                   onClick={handleExportPDF}
                   title="Export to PDF"
                   size="small"
                   sx={{ mr: 1 }}
                 >
                   <FileDownload />
                 </IconButton>
                 <IconButton 
                   onClick={handleExportExcel}
                   title="Export to Excel"
                   size="small"
                 >
                   <GetApp />
                 </IconButton>
               </Box>
             </Box>
             
             <OxDataGrid
	       rows={transactions || []}
	       columns={columns}
	       loading={transactionsLoading}
	       pagination
	       paginationMode="server"
	       rowCount={100}
	       paginationModel={{
	         page: filters.page,
	         pageSize: filters.size
	       }}
	       onPaginationModelChange={(model) => setFilters(prev => ({ 
	         ...prev, 
	         page: model.page,
	         size: model.pageSize 
	       }))}
	       autoHeight
	       disableRowSelectionOnClick
	       sx={{
	         '& .MuiDataGrid-row:hover': {
	           backgroundColor: theme.palette.action.hover
	         }
	       }}
/>
           </Box>
         </OxCard>
       </Grid>
     </Grid>
   </Box>
 );
};

export default Home;