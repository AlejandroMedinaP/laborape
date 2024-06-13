import React, { Component } from 'react';
import { withRouter } from 'next/router'; // Se cambia a withRouter para clases
import LogoBar from '@/components/layout/LogoBar';

class Formulario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titulo: '',
      descripcion: '',
      categoria: '',
      imagen: null,
      fechafin: '',
      locacion: '',
      error: null,
    };
    
    // Ligamos los métodos en el constructor
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleImageReset = this.handleImageReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleImageChange(event) {
    const file = event.target.files[0];
    this.setState({ imagen: file });
  }

  handleImageReset() {
    this.setState({ imagen: null });
    document.getElementById('imagen').value = null;
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: null });

    const formData = new FormData();
    formData.append('titulo', this.state.titulo);
    formData.append('descripcion', this.state.descripcion);
    formData.append('categoria', this.state.categoria);
    formData.append('locacion', this.state.locacion);
    formData.append('imagen', this.state.imagen);
    formData.append('fechafin', this.state.fechafin);

    try {
      const response = await fetch('localhost:8080/trabajo', { // Reemplaza con tu endpoint real
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert("La actividad se ha enviado correctamente");
      } else {
        const errorData = await response.json();
        this.setState({ error: errorData.message || 'Error al enviar la actividad' });
      }
    } catch (error) {
      this.setState({ error: 'Error en la conexión. Inténtalo de nuevo más tarde.' });
      console.error(error);
    }
  }

  render() {
    return (
      <div className="container">
        <LogoBar />
        <h1>Envía tu actividad</h1>
        <p>Por este formulario podrás subir la actividad que deseas resolver</p>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="titulo">Nombre de tarea:</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={this.state.titulo}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="descripcion">Descripción de la tarea:</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={this.state.descripcion}
              onChange={this.handleInputChange}
              rows={6}
              placeholder="Escribe la descripción de la actividad"
            />
          </div>
          <div className="form-group">
            <label htmlFor="locacion">Dirección completa:</label>
            <input
              type="text"
              id="locacion"
              name="locacion"
              value={this.state.locacion}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoria">Categoría:</label>
            <select
              id="categoria"
              name="categoria"
              value={this.state.categoria}
              onChange={this.handleInputChange}
            >
              <option value="Selecciona">--Selecciona--</option>
              <option value="Carpinteria">Carpintería</option>
              <option value="Electricista">Electricista</option>
              <option value="Mecanico">Mecánico</option>
              <option value="Plomero">Plomero</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="imagen">Subir imagen:</label>
            <input
              type="file"
              id="imagen"
              name="imagen"
              accept="image/*" // Corregido aquí
              onChange={this.handleImageChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="fechafin">Disponibilidad de la tarea:</label>
            <input
              type="date"
              id="fechafin"
              name="fechafin"
              value={this.state.fechafin}
              onChange={this.handleInputChange}
            />
          </div>
          
          {this.state.error && <p className="error-message">{this.state.error}</p>}
          <button type="submit">Enviar</button>
        </form>
        <style jsx>{`
          .form-group {
            margin-bottom: 15px;
          }
          .form-group label {
            display: block;
            margin-bottom: 5px;
          }
          .form-group input,
          .form-group textarea,
          .form-group select {
            width: 100%;
            padding: 8px;
            box-sizing: border-box;
          }
        `}</style>
      </div>
    );
  }
}

export default withRouter(Formulario); // Se usa withRouter para componentes de clase