import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Typography, Alert, Container } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAuthStore } from '@/store/useAuthStore';
import { authService } from '@/services/authService';


export const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setUser, setAccounts } = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login(username, password);
      setUser({
        customerId: response.customerId,
        firstName: response.firstName,
        lastName: response.lastName,
        type: response.type,
        preferredLanguage: response.preferredLanguage,
        lastLogin: response.lastLogin,
        token: response.token
      });
      setAccounts(response.accounts);
      navigate('/');
    } catch (err) {
      setError('Credenziali non valide');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Card sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" textAlign="center" mb={3}>
            OX Bank
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleLogin} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={loading}
            >
              Login
            </LoadingButton>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};