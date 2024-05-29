import { useState } from "react";
import { useRouter } from "next/router";

const RegistrationForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    role: "trabajador",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validación básica (puedes agregar más validaciones según tus requisitos)
    if (!formData.name || !formData.lastname || !formData.email || !formData.password) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    try {
      const response = await fetch("/api/register", { // Reemplaza con tu endpoint real
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Registro exitoso
        const data = await response.json();
        router.push("/login"); // Redirige al login (o a donde quieras)
      } else {
        // Error en el registro
        const errorData = await response.json();
        if (errorData.code === "ER_DUP_ENTRY") {
          setError("El correo electrónico ya está registrado.");
        } else {
          setError(errorData.message || "Ocurrió un error durante el registro.");
        }
      }
    } catch (error) {
      setError("Ocurrió un error durante el registro. Por favor, inténtelo de nuevo más tarde.");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="form_area">
        <p className="title">REGISTRO</p>
        <form onSubmit={handleSubmit}>
          {/* Campos del formulario */}
          <div className="form_group">
            <label className="sub_title" htmlFor="name">
              Nombre
            </label>
            <input
              placeholder="Introduzca su nombre"
              className="form_style"
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form_group">
            <label className="sub_title" htmlFor="lastname">
              Apellido
            </label>
            <input
              placeholder="Introduzca su apellido"
              id="lastname" 
              className="form_style"
              type="text" 
              value={formData.lastname}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form_group">
            <label className="sub_title" htmlFor="email">
              Email
            </label>
            <input
              placeholder="Introduzca un email"
              id="email"
              className="form_style"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form_group">
            <label className="sub_title" htmlFor="password">
              Contraseña
            </label>
            <input
              placeholder="Introduzca una contraseña"
              id="password"
              className="form_style"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form_options">
            <label className="sub_title" htmlFor="role">
              ¿Que desea en la app?
            </label>
            <div></div>
            <select id="role" className="form_style" value={formData.role} onChange={handleChange}>
              <option value="trabajador">Quiero buscar trabajo</option>
              <option value="empleador">Quiero encontrar trabajadores</option>
            </select>
          </div>
          <div>
            <button className="btn" type="submit">
              CREAR CUENTA
            </button>
            {error && <p className="error-message">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
