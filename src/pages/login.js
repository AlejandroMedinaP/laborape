import { useState } from "react";
import { useRouter } from "next/router";

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 

    // Validación básica (puedes agregar más validaciones según tus requisitos)
    if (!formData.email || !formData.password) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    try {
      const response = await fetch("/api/login", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Inicio de sesión exitoso
        // Maneja la respuesta del backend (redirección, almacenamiento de token, etc.)
        router.push("/postulacionfree"); 
      } else {
        // Error en el inicio de sesión
        const errorData = await response.json();
        setError(errorData.message || "Inicio de sesión fallido."); 
      }
    } catch (error) {
      // Error en la conexión o en el servidor
      setError("Ocurrió un error durante el inicio de sesión. Por favor, inténtelo de nuevo más tarde.");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="form_area">
        <p className="title">LaboraPE</p>
        <form onSubmit={handleSubmit}>
          <div className="form_group">
            <label className="sub_title" htmlFor="email">
              Email
            </label>
            <input
              placeholder="Ingrese su email"
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
              placeholder="Ingrese su contraseña"
              id="password"
              className="form_style"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <button className="btn" type="submit">
              INGRESAR
            </button>
            {error && <p className="error-message">{error}</p>}
            <p>
              <a className="link" href="restablecerContra">
                RESTABLECER CONTRASEÑA
              </a>
            </p>
            <p>
              <a className="link" href="/register">
                CREAR NUEVA CUENTA
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
