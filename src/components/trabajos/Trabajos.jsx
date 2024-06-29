import React, { useState, useEffect, useContext } from 'react';
import { Box, Grid, Alert } from '@mui/material';
import MisTrabajosCard from '@/components/trabajos/MisTrabajosCard';
import LogoBar from '@/components/layout/LogoBar';
import { AppContext } from '@/context/AppContext';
import EditarTrabajoModal from '@/components/trabajos/EditarTrabajoModal';
import styles from '@/styles/global/misTrabajos.module.css';

const MisTrabajos = () => {
  const { user } = useContext(AppContext);
  const [trabajos, setTrabajos] = useState([]);
  const [error, setError] = useState(null);
  const [trabajoSeleccionado, setTrabajoSeleccionado] = useState(null);

  useEffect(() => {
    const fetchTrabajos = async () => {
      if (!user) {
        setError("Debes iniciar sesión para ver tus trabajos.");
        return;
      }
      try {
        const response = await fetch(`http://localhost:8080/trabajos/cliente/${user.idusuario}`);
        if (!response.ok) {
          throw new Error("Error HTTP! status: " + response.status);
        }
        const data = await response.json();
        setTrabajos(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTrabajos();
  }, [user]);

  const handleEdit = (trabajo) => {
    setTrabajoSeleccionado(trabajo);
  };

  const handleDelete = async (idtrabajo) => {
    try {
      const response = await fetch(`http://localhost:8080/trabajos/${idtrabajo}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error("Error HTTP! status: " + response.status);
      }
      setTrabajos(trabajos.filter(trabajo => trabajo.idtrabajo !== idtrabajo));
    } catch (err) {
      setError(err.message);
    }
  };

  const closeModal = () => {
    setTrabajoSeleccionado(null);
  };

  return (
    <div className="container">
      <LogoBar />
      <h1 className={styles.title}>Mis Trabajos</h1>
      <Box className={styles.trabajosContainer}>
        {error && <Alert severity="error">{error}</Alert>}
        <Grid container spacing={3} justifyContent="center">
          {trabajos.map((trabajo) => (
            <Grid item key={trabajo.idtrabajo} xs={12} sm={6} md={4} lg={3} className={styles.gridItem}>
              <MisTrabajosCard
                trabajo={trabajo}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      {trabajoSeleccionado && (
        <EditarTrabajoModal
          trabajo={trabajoSeleccionado}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default MisTrabajos;
