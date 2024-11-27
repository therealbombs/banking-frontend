import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Drawer,
  Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AccountSelector } from '@/components/AccountSelector';
import { Sidebar } from './Sidebar';
import { useAuthStore } from '@/store/useAuthStore';

export const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setIsSidebarOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            OX Bank
          </Typography>

          <Box sx={{ mx: 2, width: 240 }}>
            <AccountSelector />
          </Box>
          
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            {user.firstName[0]}{user.lastName[0]}
          </Avatar>
        </Toolbar>
      </AppBar>
      
      <Drawer
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};