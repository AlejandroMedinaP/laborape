import React, { useState, useEffect } from 'react';
import { Box, Grid, Pagination, Alert } from '@mui/material';
import PropuestaCard from '@/components/propuestas/PropuestaCard';
import DetalleContratacion from '@/components/propuestas/DetalleContratacion';
import LogoBar from '@/components/layout/LogoBar';

const itemsPerPage = 4;

const VisualizacionPropuestas = () => {
  const [page, setPage] = useState(1);
  const [openMasDetalle, setOpenMasDetalle] = useState(false);
  const [trabajoSelected, setTrabajoSelected] = useState({});
  const [trabajos, setTrabajos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrabajos = async () => {
      try {
        const response = await fetch('http://localhost:8080/trabajos');
        const data = await response.json();
        console.log('Fetched trabajos:', data); // Add this line
        setTrabajos(data);
      } catch (err) {
        setError('Error al cargar los trabajos. Por favor, intenta nuevamente.');
      }
    };

    fetchTrabajos();
  }, []);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleVerDetalle = (id) => {
    const selected = trabajos.find((trabajo) => trabajo.idtrabajo === id);
    setTrabajoSelected(selected || {});
    setOpenMasDetalle(true);
  };

  const handleCloseDetalle = () => {
    setOpenMasDetalle(false);
  };

  const totalPages = trabajos.length > 0 ? Math.ceil(trabajos.length / itemsPerPage) : 1;
  const currentItems = trabajos.length > 0 ? trabajos.slice((page - 1) * itemsPerPage, page * itemsPerPage) : [];

  return (
    <div className="container">
      <LogoBar />
      <h1 className="titlepropuestas">Propuestas de trabajo</h1>
      <Box className="propuestas-container">
        {error && <Alert severity="error">{error}</Alert>}
        <Grid container spacing={2}>
          {currentItems.map((item) => (
            <Grid item className="MuiGrid-item" key={item.idtrabajo}>
              <PropuestaCard propuesta={item} onVerDetalle={handleVerDetalle} />
            </Grid>
          ))}
        </Grid>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          className="MuiPagination-root"
        />
      </Box>
      <DetalleContratacion
        open={openMasDetalle}
        onClose={handleCloseDetalle}
        propuesta={trabajoSelected}
      />
    </div>
  );
};

export default VisualizacionPropuestas;
