import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from '@mui/material';

const PropuestaCard = ({ propuesta, onVerDetalle }) => {
  const imagenUrl = propuesta.imagenUrl || `http://localhost:8080/trabajos/${propuesta.idtrabajo}/imagen`;

  return (
    <Card className="MuiCard-root">
      <CardMedia
        component="img"
        height="300"
        image={imagenUrl}
        alt={propuesta.titulo}
        className="MuiCardMedia-root"
        style={{ objectFit: 'cover' }}
      />
      <CardContent className="MuiCardContent-root">
        <Typography variant="h6" component="div">
          {propuesta.titulo}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {propuesta.descripcion}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onVerDetalle(propuesta.idtrabajo)}>Más Detalles</Button>
      </CardActions>
    </Card>
  );
};

export default PropuestaCard;
