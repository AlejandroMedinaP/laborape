import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const PostularPopup = ({ open, onClose, trabajo, freelancer, onPostular }) => {
  const [mensaje, setMensaje] = useState('');
  const [presupuesto, setPresupuesto] = useState('');
  const [disponibilidad, setDisponibilidad] = useState('');

  useEffect(() => {
    if (trabajo) {
      setMensaje('');
      setPresupuesto('');
      setDisponibilidad('');
    }
  }, [trabajo]);

  const handlePostular = async () => {
    // Añadir logs para confirmar valores
    console.log("Trabajo ID:", trabajo?.idtrabajo);
    console.log("Cliente ID:", trabajo?.idcliente);
    console.log("Freelancer ID:", freelancer?.idfreelancer);

    if (!trabajo || !trabajo.idtrabajo || !trabajo.idcliente || !freelancer || !freelancer.idfreelancer) {
        alert("El trabajo, el cliente o el freelancer no están definidos.");
        return;
    }

    const postulacion = {
        trabajo: { idtrabajo: trabajo.idtrabajo },
        cliente: { idcliente: trabajo.idcliente },
        freelancer: { idfreelancer: freelancer.idfreelancer },
        mensaje: mensaje,
        presupuesto: parseFloat(presupuesto),
        disponibilidad: disponibilidad
    };

    console.log("Postulación a enviar (objeto):", postulacion);

    try {
        const postulacionJSON = JSON.stringify(postulacion);
        console.log("Postulación a enviar (JSON):", postulacionJSON);

        const response = await fetch('http://localhost:8080/postulaciones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: postulacionJSON,
        });

        if (response.ok) {
            alert("Solicitud enviada");
            onPostular(); // Call the function to refresh the list of jobs
            onClose();
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.error}`);
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
};

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Postular a {trabajo?.titulo}</DialogTitle>
      <DialogContent>
        <Box mb={2} display="flex" justifyContent="center">
          <img src={`http://localhost:8080/trabajos/${trabajo?.idtrabajo}/imagen`} alt={trabajo?.titulo} style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }} />
        </Box>
        <Typography variant="h6">{trabajo?.titulo}</Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>{trabajo?.nombreCliente || 'Desconocido'}</Typography>
        <Typography variant="body1" gutterBottom>{trabajo?.descripcion}</Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>Ubicación: {trabajo?.ubicacion}</Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>Fecha Límite: {trabajo?.fechaLimite}</Typography>
        <FormControl fullWidth margin="dense">
          <InputLabel>Disponibilidad</InputLabel>
          <Select
            value={disponibilidad}
            onChange={(e) => setDisponibilidad(e.target.value)}
          >
            <MenuItem value="mañana">Mañana</MenuItem>
            <MenuItem value="tarde">Tarde</MenuItem>
            <MenuItem value="noche">Noche</MenuItem>
          </Select>
        </FormControl>
        <TextField
          autoFocus
          margin="dense"
          label="Mensaje"
          type="text"
          fullWidth
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Presupuesto"
          type="number"
          fullWidth
          value={presupuesto}
          onChange={(e) => setPresupuesto(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handlePostular}>Postular</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostularPopup;
