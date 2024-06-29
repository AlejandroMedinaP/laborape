import React, { useState, useEffect, useContext } from 'react';
import { Box, Grid, Alert, Pagination } from '@mui/material';
import LogoBarFreelance from '@/components/layout/LogoBarFreelance';
import { AppContext } from '@/context/AppContext';
import styles from '@/styles/global/trabajosFreelancer.module.css';
import PostularPopup from '@/components/trabajos/PostularPopup';

const TrabajosFreelancer = () => {
  const { user } = useContext(AppContext);
  const [trabajos, setTrabajos] = useState([]);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedTrabajo, setSelectedTrabajo] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [success, setSuccess] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(4);

  useEffect(() => {
    const fetchTrabajos = async () => {
      try {
        const response = await fetch('http://localhost:8080/trabajos');
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
  }, []);

  const handleOpen = (trabajo) => {
    setSelectedTrabajo(trabajo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTrabajo(null);
    setMensaje('');
  };

  const handlePostulacion = async () => {
    if (user && user.idusuario && selectedTrabajo && mensaje) {
      try {
        const postulacionData = {
          trabajo: { idtrabajo: selectedTrabajo.idtrabajo },
          freelancer: { idfreelancer: user.idusuario },
          cliente: { idcliente: user.idusuario },
          mensaje,
        };

        const response = await fetch('http://localhost:8080/postulaciones', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postulacionData),
        });

        if (!response.ok) {
          throw new Error("Error HTTP! status: " + response.status);
        }

        setSuccess(true);
        handleClose();
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError("Datos incompletos para realizar la postulación.");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const indexOfLastPost = page * rowsPerPage;
  const indexOfFirstPost = indexOfLastPost - rowsPerPage;
  const currentTrabajos = trabajos.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <LogoBarFreelance />
      <div className={styles.containerTrabajosFreelancer}>
        <h1 className={styles.titleFreelancer}>Trabajos Disponibles</h1>
        <Box className={styles.trabajosContainerFreelancer}>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">¡Su postulación ha sido enviada!</Alert>}
          <Grid container spacing={2} justifyContent="center">
            {currentTrabajos.map((trabajo, index) => (
              <Grid item key={index} className={styles.trabajoItemFreelancer}>
                <div className={styles.trabajoDetailsFreelancer}>
                  <img src={`http://localhost:8080/trabajos/${trabajo.idtrabajo}/imagen`} alt={trabajo.titulo} className={styles.trabajoImageFreelancer} />
                  <h2 className={styles.trabajoTitleFreelancer}>{trabajo.titulo}</h2>
                  <p className={styles.trabajoDescriptionFreelancer}>{trabajo.descripcion}</p>
                  <p className={styles.trabajoDescriptionFreelancer}>Presupuesto: {trabajo.presupuesto}</p>
                  <button className={styles.postularButtonFreelancer} onClick={() => handleOpen(trabajo)}>POSTULAR</button>
                </div>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Pagination
          count={Math.ceil(trabajos.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          className={styles.pagination}
        />
      </div>
      <PostularPopup 
        open={open}
        onClose={handleClose}
        trabajo={selectedTrabajo}
      />
    </>
  );
};

export default TrabajosFreelancer;
