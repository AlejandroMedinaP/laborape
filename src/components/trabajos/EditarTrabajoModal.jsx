import React, { useState } from 'react';
import styles from '@/styles/global/misTrabajos.module.css';

const EditarTrabajoModal = ({ trabajo, onClose }) => {
  const [formData, setFormData] = useState({
    titulo: trabajo.titulo,
    descripcion: trabajo.descripcion,
    categoria: trabajo.categoria,
    ubicacion: trabajo.ubicacion,
    fechaLimite: new Date(trabajo.fechaLimite).toISOString().split('T')[0], // Formato YYYY-MM-DD
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/trabajos/${trabajo.idtrabajo}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Trabajo actualizado con éxito');
        onClose();
        window.location.reload();
      } else {
        alert('Error al actualizar el trabajo');
      }
    } catch (error) {
      console.error('Error updating trabajo:', error);
      alert('Error al actualizar el trabajo');
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Editar Trabajo</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Título</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <label>Categoría</label>
            <input
              type="text"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Ubicación</label>
            <input
              type="text"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Fecha Límite</label>
            <input
              type="date"
              name="fechaLimite"
              value={formData.fechaLimite}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Guardar Cambios</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
};

export default EditarTrabajoModal;
