import { useState } from "react";
import { useRouter } from "next/router";
import { register } from "@/services/userService";

const username = 'user';
const password = '67c7122a-25c3-4f87-aee6-4680a5bfd111';

const RegistrationForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    correo: "",
    contrasenia: "",
    roles: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      /* const headers = new Headers();
      headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));
      headers.set('Content-Type', 'application/json'); */
      const response = await register(formData);
      //const data = response.data;
      console.log("data", data)
      if (response.ok) {
        // Registro exitoso
        //const data = await response.json();
        console.log("OK")
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
              Nombre Completo
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
            <label className="sub_title" htmlFor="correo">
              correo
            </label>
            <input
              placeholder="Introduzca un correo"
              id="correo"
              className="form_style"
              type="correo"
              value={formData.correo}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form_group">
            <label className="sub_title" htmlFor="contrasenia">
              Contraseña
            </label>
            <input
              placeholder="Introduzca una contraseña"
              id="contrasenia"
              className="form_style"
              type="password"
              value={formData.contrasenia}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form_options">
            <label className="sub_title" htmlFor="roles">
              ¿Que desea en la app?
            </label>
            <div></div>
            <select id="roles" className="form_style" value={formData.roles} onChange={handleChange}>
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
