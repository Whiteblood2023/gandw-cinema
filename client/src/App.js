import React from 'react';
import { ThemeProvider, CssBaseline, AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              G.and.W Cinema 🎬
            </Typography>
            <Button color="inherit" component={Link} to="/">Filmes</Button>
            <Button color="inherit" component={Link} to="/login">Entrar</Button>
            <Button color="inherit" component={Link} to="/register">Cadastrar</Button>
          </Toolbar>
        </AppBar>
        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;