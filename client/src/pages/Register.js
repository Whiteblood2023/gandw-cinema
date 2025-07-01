import React, { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, Alert, Link as MuiLink } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError('As senhas não conferem.');
      return;
    }
    fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(res => {
        if (!res.ok) return res.json().then(d => { throw new Error(d.message); });
        return res.json();
      })
      .then(() => {
        setMsg('Cadastro realizado! Faça login.');
        setTimeout(() => navigate('/login'), 2000);
      })
      .catch(err => setError(err.message));
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
      <Paper elevation={6} sx={{ p: 4, minWidth: 320 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Cadastro
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {msg && <Alert severity="success">{msg}</Alert>}
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
          <TextField
            label="Confirmar senha"
            type="password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            fullWidth margin="normal" required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth sx={{ mt: 2 }}
          >
            Cadastrar
          </Button>
        </form>
        <Box mt={2} textAlign="center">
          <MuiLink component={Link} to="/login">
            Já tem conta? Entrar
          </MuiLink>
        </Box>
      </Paper>
    </Box>
  );
}

export default Register;