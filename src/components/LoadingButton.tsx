import React from 'react';
import { Button, CircularProgress, ButtonProps } from '@mui/material';

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  children,
  loading,
  ...props
}) => {
  return (
    <Button {...props} disabled={loading || props.disabled}>
      {loading ? <CircularProgress size={24} /> : children}
    </Button>
  );
};