import React from 'react';
import { Card, CardMedia, CardContent, Typography, Chip, Box } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';

function FilmCard({ filme }) {
  return (
    <Card elevation={4}>
      <CardMedia
        component="img"
        height="340"
        image={filme.imagem}
        alt={filme.titulo}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {filme.titulo}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ minHeight: 48 }}>
          {filme.descricao}
        </Typography>
        <Box mt={2}>
          <Chip
            label={filme.online ? "Disponível Online" : "Em Breve"}
            color={filme.online ? "primary" : "default"}
            icon={<MovieIcon />}
            variant="outlined"
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default FilmCard;