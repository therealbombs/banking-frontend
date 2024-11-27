import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MenuItem } from '@/types/menu';
import { useAppStore } from '@/store/useAppStore';

interface SidebarProps {
  onClose: () => void;
}

export const Sidebar = ({ onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const menuItems = useAppStore(state => state.menuItems);

  return (
    <Box sx={{ width: 250 }}>
      <List>
        {menuItems.map((item: MenuItem) => (
          <ListItem 
            button 
            key={item.id}
            onClick={() => {
              navigate(item.path);
              onClose();
            }}
          >
            {item.icon && <ListItemIcon>{React.createElement(item.icon)}</ListItemIcon>}
            <ListItemText primary={item.textKey} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};