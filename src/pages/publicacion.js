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
    this.router = useRouter();
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
        <h1>Bienvenido a mi aplicación</h1>
        <p>Serás redirigido a la página de inicio de sesión en breve.</p>
        <form className="form" onSubmit={this.handleSubmit.bind(this)}>
          <h2>Crear Nueva Tarea</h2>
          <div className="form-group">
            <label htmlFor="task">Tarea:</label>
            <input
              type="text"
              id="task"
              name="task"
              value={this.state.task}
              onChange={this.handleInputChange.bind(this)}
            />
          </div>
          {/* Resto del formulario */}
          <button type="submit">Enviar</button>
        </form>
      </div>
    );
  }
}

export default formulario;