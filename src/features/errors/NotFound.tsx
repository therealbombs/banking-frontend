import { Box, Typography } from '@mui/material';

export const NotFound = () => {
  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h2">404</Typography>
      <Typography variant="h5">Page Not Found</Typography>
    </Box>
  );
};