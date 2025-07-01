import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Azul
    },
    secondary: {
      main: '#ff9800', // Laranja
    },
    background: {
      default: '#f7f7fa',
      paper: '#fff',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'scale(1.03)',
            boxShadow: '0 8px 32px rgba(25, 118, 210, 0.2)',
          },
        },
      },
    },
  },
});

export default theme;