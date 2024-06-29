import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import styles from '@/styles/global/perfil.module.css';
import LogoBarFreelance from '@/components/layout/LogoBarFreelance';

const Perfil = () => {
  const [perfil, setPerfil] = useState({
    nombre: "Freelancer",
    edad: 30,
    sexo: "Hombre",
    email: "freelancer@example.com",
    numero: "123456789",
    imagenUrl: "https://via.placeholder.com/150"
  });

  const [editMode, setEditMode] = useState(false);
  const [formPerfil, setFormPerfil] = useState(perfil);

  useEffect(() => {
    setFormPerfil(perfil);
  }, [perfil]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormPerfil({
      ...formPerfil,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormPerfil({
          ...formPerfil,
          imagenUrl: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGuardarPerfil = () => {
    setPerfil(formPerfil);
    setEditMode(false);
  };

  const handleEditarPerfil = () => {
    setEditMode(true);
  };

  return (
    <div className={styles.container}>
      <LogoBarFreelance />
      <Box className={styles.perfilContainer}>
        <img src={formPerfil.imagenUrl} alt={formPerfil.nombre} className={styles.perfilImage} />
        {!editMode ? (
          <>
            <div className={styles.perfilDetails}>
              <h2>{perfil.nombre}</h2>
              <p>Edad: {perfil.edad}</p>
              <p>Sexo: {perfil.sexo}</p>
              <p>Email: {perfil.email}</p>
              <p>Número: {perfil.numero}</p>
            </div>
            <Button variant="contained" color="primary" onClick={handleEditarPerfil} className={styles.fullWidthButton}>
              Editar Perfil
            </Button>
          </>
        ) : (
          <form className={styles.form}>
            <TextField
              label="Nombre"
              name="nombre"
              value={formPerfil.nombre}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Edad"
              name="edad"
              type="number"
              value={formPerfil.edad}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Sexo</InputLabel>
              <Select
                label="Sexo"
                name="sexo"
                value={formPerfil.sexo}
                onChange={handleChange}
              >
                <MenuItem value="Hombre">Hombre</MenuItem>
                <MenuItem value="Mujer">Mujer</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formPerfil.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Número"
              name="numero"
              value={formPerfil.numero}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <Button
              variant="contained"
              component="label"
              fullWidth
              className={styles.uploadButton}
            >
              Subir Imagen
              <input type="file" hidden onChange={handleImageChange} />
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGuardarPerfil}
              fullWidth
              className={styles.fullWidthButton}
            >
              Guardar Perfil
            </Button>
          </form>
        )}
      </Box>
    </div>
  );
};

export default Perfil;
