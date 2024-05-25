import React, { Component } from 'react';
import { useRouter } from 'next/router';
import NavBar from '@/components/navbar';


class Formulario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: '',
      description: '',
      category: 'personal',
      image: null,
      additionalInfo: '',
      deadline: '',
    };
  }

  handleInputChange(event) {
    const { name, value } = event.target;


    this.setState({ [name]: value });
  }

  handleImageChange(event) {
    const file = event.target.files[0];
    this.setState({ image: file });
  }

  handleSubmit(event) {
    event.preventDefault();
    // Aquí puedes agregar la lógica para enviar el formulario
  }

  handleImageReset() {
    this.setState({ image: null });
    document.getElementById('image').value = null; // Resetear el input de archivo
  }g

  render() {
    return (
      <div className="container">
       <NavBar></NavBar>
        <h1>Envía tu actividad</h1>
        <p>Por este formulario podrás subir la actividad que deseas resolver</p>
        <form className="form" onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label htmlFor="task">Nombre de tarea:</label>
            <input
              type="text"
              id="task"
              name="task"
              value={this.state.task}
              onChange={this.handleInputChange.bind(this)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción de la tarea:</label>
            <textarea
              id="description"
              name="description"
              value={this.state.description}
              onChange={this.handleInputChange.bind(this)}
              rows={6} // Número de filas
              placeholder="Escribe la descripción de la actividad"
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Locacion:</label>
            <input
              type="text"
              id="locacion"
              name="locacion"
              value={this.state.locacion}
              onChange={this.handleInputChange.bind(this)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Categoría:</label>
            <select
              id="category"
              name="category"
              value={this.state.category}
              onChange={this.handleInputChange.bind(this)}
            >
              <option value="personal">--Selecciona--</option>
              <option value="trabajo">Carpintería</option>
              <option value="estudios">Electricista</option>
              <option value="estudios">Mecánico</option>
              <option value="estudios">Fontanero</option>
              {/* Puedes agregar más opciones según tus necesidades */}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="image">Subir Imagen:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={this.handleImageChange.bind(this)}
            />
          </div>
          <div className="form-group">
          <label htmlFor="deadline">Fecha Límite:</label>
             <input
              type="date"
              id="deadline"
              name="deadline"
              value={this.state.deadline}
               onChange={this.handleInputChange}
            />
          </div>
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

export default Formulario;