import React, { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, Alert, Link as MuiLink } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(res => {
        if (!res.ok) throw new Error('Usuário ou senha inválidos');
        return res.json();
      })
      .then(data => {
        localStorage.setItem('token', data.token);
        navigate('/');
      })
      .catch(err => setError(err.message));
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
      <Paper elevation={6} sx={{ p: 4, minWidth: 320 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Entrar
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Usuário"
            value={username}
            onChange={e => setUsername(e.target.value)}
            fullWidth margin="normal" required
          />
          <TextField
            label="Senha"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth margin="normal" required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth sx={{ mt: 2 }}
          >
            Entrar
          </Button>
        </form>
        <Box mt={2} textAlign="center">
          <MuiLink component={Link} to="/forgot-password">
            Esqueci a senha
          </MuiLink>
        </Box>
        <Box mt={1} textAlign="center">
          <MuiLink component={Link} to="/register">
            Não tem uma conta? Cadastre-se
          </MuiLink>
        </Box>
      </Paper>
    </Box>
  );
}

export default Login;