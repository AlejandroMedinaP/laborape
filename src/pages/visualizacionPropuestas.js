import { useState } from 'react';
import { Box, Grid, Pagination } from '@mui/material';
import PropuestaCard from '@/components/PropuestaCard';

import LogoBar from '@/components/LogoBar';

const itemsPerPage = 4;

const visualizacionPropuestas = () => {const [page, setPage] = useState(1);
  
    const handleChangePage = (event, value) => {
      setPage(value);
    };
  
    const propuestas = [
      {
        id: 1,
        imagen: '../Imagenes/logoLA.jpg',
        nombre: 'Nombre Propuesta 1',
        descripcion: 'Descripción breve de la Propuesta 1'
      },
      {
        id: 2,
        imagen: '../Imagenes/logoLA.jpg',
        nombre: 'Nombre Propuesta 2',
        descripcion: "Descripción breve de la Propuesta 2"
      },
      {
        id: 3,
        imagen: '../Imagenes/logoLA.jpg',
        nombre: 'Nombre Propuesta 3',
        descripcion: 'Descripción breve de la Propuesta 3'
      },
      {
        id: 4,
        imagen: '../Imagenes/logoLA.jpg',
        nombre: 'Nombre Propuesta 4',
        descripcion: 'Descripción breve de la Propuesta 4'
      },
      {
        id: 5,
        imagen: '../Imagenes/logoLA.jpg',
        nombre: 'Nombre Propuesta 5',
        descripcion: 'Descripción breve de la Propuesta 5'
      },
      {
        id: 6,
        imagen: '../Imagenes/logoLA.jpg',
        nombre: 'Nombre Propuesta 6',
        descripcion: 'Descripción breve de la Propuesta 6'
      },
      
      // Puedes agregar más propuestas según sea necesario
    ];
    const totalPages = Math.ceil(propuestas.length / itemsPerPage);

  const currentItems = propuestas.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="container">
      <LogoBar></LogoBar>
      <h1>Visualización de propuestas para tus trabajos</h1>
      <Box sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          {currentItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box sx={{ border: '1px solid grey', padding: 2, borderRadius: 2 }}>
                <PropuestaCard 
                  id={item.id}
                  nombre={item.nombre}
                  descripcion={item.descripcion}
                  image={item.imagen}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        </Box>
      </Box>
      </div>
  );
}

export default visualizacionPropuestas;