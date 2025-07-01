import React, { useEffect, useState } from 'react';
import { Grid, Typography, CircularProgress, Fade } from '@mui/material';
import FilmCard from '../components/FilmCard';

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/filmes', {
      headers: {
        'Authorization': localStorage.getItem('token') ? 'Bearer ' + localStorage.getItem('token') : ''
      }
    })
      .then(res => res.json())
      .then(data => {
        setFilmes(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        🎬 Filmes em Cartaz
      </Typography>
      {loading ? (
        <Grid container justifyContent="center"><CircularProgress /></Grid>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {filmes.map((filme, idx) => (
            <Fade in timeout={700 + idx * 200} key={filme.titulo}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <FilmCard filme={filme} />
              </Grid>
            </Fade>
          ))}
        </Grid>
      )}
    </div>
  );
}

export default Home;