import React, { Component } from 'react';
import { useRouter } from 'next/router';
import LogoBar from '@/components/LogoBar';

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
      location: '',
      error: null,
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleImageChange = (event) => {
    const file = event.target.files[0];
    this.setState({ image: file });
  };

  handleImageReset = () => {
    this.setState({ image: null });
    document.getElementById('image').value = null;
  };

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: null });

    const formData = new FormData();
    formData.append('task', this.state.task);
    formData.append('description', this.state.description);
    formData.append('category', this.state.category);
    formData.append('location', this.state.location);
    if (this.state.image) {
      formData.append('image', this.state.image);
    }
    formData.append('additionalInfo', this.state.additionalInfo);
    formData.append('deadline', this.state.deadline);

    try {
      const response = await fetch('/api/submit-activity', { // Reemplaza con tu endpoint real
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert("La actividad se ha enviado correctamente");
        // Puedes redirigir al usuario o mostrar un mensaje de éxito
        // Ejemplo: router.push('/activities');
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
              rows={6}
              placeholder="Escribe la descripción de la actividad"
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Locacion:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={this.state.location}
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
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="image">Subir Imagen:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={this.handleImageChange}
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
          <div className="form-group">
            <label htmlFor="additionalInfo">Extra:</label>
            <textarea
              id="additionalInfo" // Cambiar el id
              name="additionalInfo" // Cambiar el name
              value={this.state.additionalInfo} // Cambiar el value
              onChange={this.handleInputChange.bind(this)}
              rows={6}
              placeholder="Comenta algo adicional"
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

export default Formulario;