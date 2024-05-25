import React from 'react';


const LogoBar = () => {
  return (
    <div className="logo-bar">
      {/* Logo */}
      <div className="logo">
        <img src={LaboraPe} style={{ width: '100px', height: '50px' }} />
      </div>

      {/* Enlaces de Navegación */}
      <nav>
        <ul>
          <li>
            <a href="#">Inicio</a>
          </li>
          <li>
            <a href="#">Mis Propuestas</a>
          </li>
          <li>
            <a href="#">Mis Trabajos</a>
          </li>
        </ul>
      </nav>

      {/* Acciones de Usuario */}
      <div className="user-actions">
        <a href="#">Cerrar Sesión</a>
      </div>
    </div>
  );
};

export default LogoBar;