import React, { useEffect, useState, useContext } from 'react';
import { Box, Grid, Alert, Button } from '@mui/material';
import LogoBarFreelance from '@/components/layout/LogoBarFreelance';
import { AppContext } from '@/context/AppContext';
import styles from '@/styles/global/verPropuestas.module.css';

const Propuestas = () => {
  const { user } = useContext(AppContext);
  const [propuestas, setPropuestas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPropuestas = async () => {
      if (!user) {
        setError("Debes iniciar sesión para ver tus postulaciones.");
        return;
      }
      try {
        const response = await fetch(`http://localhost:8080/postulaciones/freelancer/${user.idusuario}`);
        if (!response.ok) {
          throw new Error("Error HTTP! status: " + response.status);
        }
        const data = await response.json();
        setPropuestas(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPropuestas();
  }, [user]);

  const handleCancel = (propuestaId) => {
    // Aquí iría la lógica para cancelar la postulación
    console.log(`Cancelar postulación ${propuestaId}`);
  };

  return (
    <>
      <LogoBarFreelance />
      <div className={styles.container}>
        <h1 className={styles.title}>Mis Postulaciones</h1>
        <Box className={styles.propuestasWrapper}>
          {error && <Alert severity="error">{error}</Alert>}
          <Grid container spacing={2} justifyContent="center">
            {propuestas.map((propuesta, index) => (
              <Grid item key={index} className={styles.propuestaItem}>
                <div className={styles.propuestaDetails}>
                  <img src={propuesta.trabajo.imagenUrl} alt={propuesta.trabajo.titulo} className={styles.trabajoImage} />
                  <h2 className={styles.trabajoTitle}>{propuesta.trabajo.titulo}</h2>
                  <p className={styles.trabajoDescription}>{propuesta.trabajo.descripcion}</p>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={styles.cancelButton}
                    onClick={() => handleCancel(propuesta.id)}
                  >
                    CANCELAR POSTULACIÓN
                  </Button>
                </div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default Propuestas;
