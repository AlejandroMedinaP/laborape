import React from 'react';
import Link from 'next/link';


const PaginaTareas = () => {
    const [tareas, setTareas] = React.useState([]);
    const [filtros, setFiltros] = React.useState({
      categoria: '',
      ubicacion: '',
      tipoPago: '',
    });
  
    React.useEffect(() => {
      // Obtener tareas desde la API
      fetch('/api/tareas')
        .then((respuesta) => respuesta.json())
        .then((datos) => setTareas(datos));
    }, []);
  
    const manejarCambioFiltro = (evento) => {
      const { name, value } = evento.target;
      setFiltros(filtrosAnteriores => ({
        ...filtrosAnteriores,
        [name]: value,
      }));
    };
  
    const tareasFiltradas = tareas.filter((tarea) => {
      const { categoria, ubicacion, tipoPago } = filtros;
      return (
        (categoria === '' || tarea.categoria === categoria) &&
        (ubicacion === '' || tarea.ubicacion === ubicacion) &&
        (tipoPago === '' || tarea.tipoPago === tipoPago)
      );
    });
  
    return (
      <div>
        <div className="header">
          <div className="search-bar">
            <input type="text" placeholder="Buscar" />
            <button>Buscar</button>
          </div>
        </div>
        <nav className="nav">
          <Link href="/">Inicio</Link>
          <Link href="/tareas">Tareas</Link>
          <Link href="/perfil">Perfil</Link>
          <Link href="/notificaciones">Notificaciones</Link>
        </nav>
        <div className="tasks-container">
          <div className="filters">
            <div className="filter">
              <label htmlFor="categoria">Categoría:</label>
              <select id="categoria" name="categoria" value={filtros.categoria} onChange={manejarCambioFiltro}>
                <option value="">Todas las categorías</option>
                <option value="Plomería">Plomería</option>
                <option value="Albañilería">Albañilería</option>
                <option value="Kinesiólogía">Kinesiólogía</option>
                <option value="Electricista">Electricista</option>
                <option value="Gasfitería">Gasfitería</option>
              </select>
            </div>
            <div className="filter">
              <label htmlFor="ubicacion">Ubicación:</label>
              <input type="text" id="ubicacion" name="ubicacion" value={filtros.ubicacion} onChange={manejarCambioFiltro} />
            </div>
            <div className="filter">
              <label htmlFor="tipoPago">Tipo de Pago:</label>
              <select id="tipoPago" name="tipoPago" value={filtros.tipoPago} onChange={manejarCambioFiltro}>
                <option value="">Todos los tipos de pago</option>
                <option value="por-hora">Por hora</option>
                <option value="fijo">Fijo</option>
              </select>
            </div>
            <button className="apply-filters-button" onClick={() => console.log("Filtros Aplicados")}>Aplicar Filtros</button>
          </div>
          <div className="tasks-list">
            {tareasFiltradas.map((tarea) => (
              <Tarea key={tarea.id} tarea={tarea} />
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default PaginaTareas;
  
  const Tarea = ({ tarea }) => {
    return (
      <div className="task">
        <div className="task-title">
          <Link href={`/tareas/${tarea.id}`}>{tarea.titulo}</Link>
          <div className="sorting">
            <select onChange={(e) => console.log("Ordenando:", e.target.value)}>
              <option value="ascendente">Ascendente</option>
              <option value="descendente">Descendente</option>
            </select>
            <button>Ordenar</button>
          </div>
        </div>
        <div className="task-details">
          <p>{tarea.descripcion}</p>
          <div className="task-info">
            <div className="task-info-item">
              <label>Categoría:</label>
              <span>{tarea.categoria}</span>
            </div>
            <div className="task-info-item">
              <label>Nombre del Cliente:</label>
              <span>{tarea.nombreCliente}</span>
            </div>
            <div className="task-info-item">
              <label>Fecha de Publicación:</label>
              <span>{tarea.fechaPublicacion}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };