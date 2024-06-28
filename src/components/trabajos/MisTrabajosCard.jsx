import React from 'react';
import styles from '@/styles/global/MisTrabajosCard.module.css';

const MisTrabajosCard = ({ trabajo, onEdit, onDelete }) => {
  return (
    <div className={styles.card}>
      <h2>{trabajo.titulo}</h2>
      <p>{trabajo.descripcion}</p>
      <div className={styles.actions}>
        <button onClick={() => onEdit(trabajo)}>Editar</button>
        <button onClick={() => onDelete(trabajo.idtrabajo)}>Eliminar</button>
      </div>
    </div>
  );
};

export default MisTrabajosCard;
