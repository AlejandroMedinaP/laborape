import { useState } from "react";
import { useRouter } from "next/router";
import { register } from "@/services/userService";

const username = 'user';
const password = '67c7122a-25c3-4f87-aee6-4680a5bfd111';

const RegistrationForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contrasenia: "",
<<<<<<< HEAD
    roles: "",
=======
    rol: "CLIENTE", // Valor por defecto CLIENTE
>>>>>>> aecef71a1932a3a7abbc1ba6e5d9be86b1a6d8db
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Estado de carga

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true); // Iniciar carga

    // Validación básica en el frontend
    if (!formData.nombre || !formData.correo || !formData.contrasenia) {
      setError("Por favor, completa todos los campos.");
      setIsLoading(false); // Finalizar carga si hay error
      return;
    }

    try {
<<<<<<< HEAD
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
=======
      const response = await fetch("http://localhost:8080/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.rol === "FREELANCER") {
          // Registrar como freelancer
          await fetch("http://localhost:8080/freelancers", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                  idusuario: data.idusuario, 
                  // Opcional, puedes agregar más campos si es necesario:
                  // calificacion: 0.0, 
                  // descripcion: "", 
                  // habilidades: "" 
              }),
          });
      } else if (data.rol === "CLIENTE") {
        // Registrar como cliente
        await fetch("http://localhost:8080/clientes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idusuario: data.idusuario }), 
        });
      } 

        router.push("/login");
>>>>>>> aecef71a1932a3a7abbc1ba6e5d9be86b1a6d8db
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Ocurrió un error durante el registro.");
      }
    } catch (error) {
      setError(
        "Error al registrarse. Inténtalo de nuevo más tarde."
      );
      console.error(error);
    } finally {
      setIsLoading(false); // Finalizar carga en cualquier caso
    }
  };


  return (
    <div className="container">
      <div className="form_area">
        <p className="title">REGISTRO</p>
        <form onSubmit={handleSubmit}>
          {/* Campos del formulario (nombre, correo, contraseña) */}
          <div className="form_group">
            <label className="sub_title" htmlFor="nombre">
              Nombre Completo
            </label>
            <input
              placeholder="Introduzca su nombre"
              className="form_style"
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form_group">
            <label className="sub_title" htmlFor="correo">
              Correo
            </label>
            <input
              placeholder="Introduzca un correo"
              className="form_style"
              type="email"
              name="correo"
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
              className="form_style"
              type="password"
              name="contrasenia"
              value={formData.contrasenia}
              onChange={handleChange}
              required
            />
          </div>

          {/* Selección de Rol (con estilo corregido) */}
          <div className="form_group"> 
            <label className="sub_title" htmlFor="rol">
              ¿Qué desea en la app?
            </label>
            <select
              name="rol"
              id="rolSelect" 
              className="form_style"
              value={formData.rol}
              onChange={handleChange}
            >
              <option value="CLIENTE">Cliente</option>
              <option value="FREELANCER">Freelancer</option>
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
