import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from '@mui/material';
import styles from '@/styles/global/postularPopup.module.css';

const PostularPopup = ({ open, onClose, trabajo, freelancerId }) => {
  const [mensaje, setMensaje] = React.useState("");
  const [presupuesto, setPresupuesto] = React.useState(trabajo?.presupuesto || "");

  const handleMensajeChange = (event) => {
    setMensaje(event.target.value);
  };

  const handlePresupuestoChange = (event) => {
    setPresupuesto(event.target.value);
  };

  const handlePostular = async () => {
    const postulacion = {
      idfreelancer: freelancerId,
      idtrabajo: trabajo.idtrabajo,
      idcliente: trabajo?.cliente?.idcliente || null,
      mensaje: mensaje,
      presupuesto: presupuesto
    };

    try {
      const response = await fetch('http://localhost:8080/postulaciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postulacion)
      });

      if (!response.ok) {
        throw new Error(`Error HTTP! status: ${response.status}`);
      }

      console.log('Postulación creada:', await response.json());
      onClose();
    } catch (error) {
      console.error('Error al postular:', error);
      alert(`Error al postular: ${error.message}`);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: styles.dialogPaper }}>
      <DialogTitle className={styles.dialogTitle}>Detalles del Trabajo</DialogTitle>
      <DialogContent className={styles.dialogContent}>
        {trabajo && (
          <>
            <img src={`http://localhost:8080/trabajos/${trabajo.idtrabajo}/imagen`} alt={trabajo.titulo} className={styles.trabajoImage} />
            <Typography variant="h6" className={styles.trabajoTitulo}>{trabajo.titulo}</Typography>
            <Typography variant="body1" className={styles.trabajoDescripcion}>{trabajo.descripcion}</Typography>
            <Typography variant="body2" className={styles.trabajoUbicacion}>Ubicación: {trabajo.ubicacion}</Typography>
            <Typography variant="body2" className={styles.trabajoFechaLimite}>Fecha Límite: {trabajo.fechaLimite}</Typography>
            <TextField
              label="Presupuesto"
              value={presupuesto}
              onChange={handlePresupuestoChange}
              variant="outlined"
              fullWidth
              margin="normal"
              className={styles.presupuestoInput}
            />
            <TextField
              label="Mensaje"
              multiline
              rows={2}
              value={mensaje}
              onChange={handleMensajeChange}
              variant="outlined"
              fullWidth
              margin="normal"
              className={styles.mensajeInput}
            />
          </>
        )}
      </DialogContent>
      <DialogActions className={styles.dialogActions}>
        <Button onClick={onClose} className={styles.cancelButton}>Cancelar</Button>
        <Button onClick={handlePostular} className={styles.postularButton}>Postular</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostularPopup;
