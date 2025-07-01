import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Alert } from '@mui/material';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simplesmente envia via Formspree
    fetch('https://formspree.io/f/xdkzyepv', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new URLSearchParams({ email })
    }).then(() => setSent(true));
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
      <Paper elevation={6} sx={{ p: 4, minWidth: 320 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Recuperar Senha
        </Typography>
        {sent ? (
          <Alert severity="success">Pedido enviado! Você receberá instruções por e-mail.</Alert>
        ) : (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Seu e-mail"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              fullWidth margin="normal" required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth sx={{ mt: 2 }}
            >
              Enviar pedido
            </Button>
          </form>
        )}
      </Paper>
    </Box>
  );
}

export default ForgotPassword;