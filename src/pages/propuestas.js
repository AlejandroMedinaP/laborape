import React from 'react';
import LogoBar from '@/component/LogoBar';
import LaboraPe from '../Imagenes/LaboraPe.png';
class propuestas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propuestas: [
        {
          id: 1,
          imagen: 'ruta-imagen-1',
          nombre: 'Nombre Propuesta 1',
          descripcion: 'Descripción breve de la Propuesta 1'
        },
        {
          id: 2,
          imagen: 'ruta-imagen-2',
          nombre: 'Nombre Propuesta 2',
          descripcion: 'Descripción breve de la Propuesta 2'
        },
        // Puedes agregar más propuestas según sea necesario
      ]
    };
  }

  render() {
    const { propuestas } = this.state;

    return (
      <div className="container">
        <LogoBar></LogoBar>
        <h1>Freelancer Proposals for Job Applicant</h1>
        {propuestas.map(propuesta => (
          <div key={propuesta.id} className="propuesta-card">
            <img src={propuesta.imagen} alt="Imagen Propuesta" />
            <h2>{propuesta.nombre}</h2>
            <p>{propuesta.descripcion}</p>
            <div className="botones">
              <button>View Profile</button>
              <button>Aceptar</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default propuestas;