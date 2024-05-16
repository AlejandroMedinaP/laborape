import React from 'react';
import styles from './Filtros.module.css'


const TrabajoItem = ({ trabajo, onPostular }) => {
  const handlePostular = () => {
    // Lógica para postularse al trabajo
    onPostular(trabajo.id);
  };

  return (
    <div>
      <h3>{trabajo.titulo}</h3>
      <p>{trabajo.descripcion}</p>
      <button onClick={handlePostular}>Postularse</button>
    </div>
  );
};

export default TrabajoItem;