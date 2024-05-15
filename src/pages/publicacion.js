import React, { Component } from 'react';
import { useRouter } from 'next/router';



class formulario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: '',
      description: '',
      category: 'personal',
      image: null,
      additionalInfo: '',
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

  render() {
    return (
      <div className="container">
        <h1>Eniva tu actividad</h1>
        <p>Por este formulario podras subir la actividad que deseas resolver</p>
        <form className="form" onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label htmlFor="task">Nomnre de tarea:</label>
            <input
              type="text"
              id="task"
              name="task"
              value={this.state.task}
              onChange={this.handleInputChange.bind(this)}
            />
          </div>
          <div>
          <label htmlFor="task">Descripcion de la tarea:</label>
            <textarea
                id="description"
                name="description"
                value={this.state.description}
                onChange={this.handleInputChange.bind(this)}
                rows={6} // Número de filas
            />
           </div>
          {/* Resto del formulario */}
          <div>
          <label htmlFor="category">Categoría:</label>
            <select
                id="category"
                name="category"
                value={this.state.category}
                onChange={this.handleInputChange.bind(this)}
            >
                <option value="personal">--Selecciona--</option>
                <option value="trabajo">Carpintenria</option>
                <option value="estudios">Electricista</option>
                <option value="estudios">Mecanico</option>
                <option value="estudios">Fontanero</option>
            {/* Puedes agregar más opciones según tus necesidades */}
            </select>
            </div>
        </form>
        <div>
            <label htmlFor="location">Ubicación:</label>
                <MapContainer />
        </div>
        <label htmlFor="image">Subir Imagen:</label>
                <input
                     type="file"
                     id="image"
                     name="image"
                     accept="image/*"
                     onChange={this.handleImageChange.bind(this)}
                />
        <button type="submit">Enviar</button>
      </div>
    );
  }
}

export default formulario;