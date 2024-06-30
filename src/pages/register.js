import { useState } from "react";
import { useRouter } from "next/router";

const RegistrationForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contrasenia: "",
    rol: "CLIENTE",
    edad: "",
    sexo: "",
    numeroCelular: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!formData.nombre || !formData.correo || !formData.contrasenia || !formData.edad || !formData.sexo || !formData.numeroCelular) {
        setError("Por favor, completa todos los campos.");
        setIsLoading(false);
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/usuarios", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const data = await response.json();

            if (data.rol === "FREELANCER") {
                await fetch("http://localhost:8080/freelancers", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        idusuario: data.idusuario,
                    }),
                });
            } else if (data.rol === "CLIENTE") {
                await fetch("http://localhost:8080/clientes", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ idusuario: data.idusuario }), 
                });
            } 

            router.push("/login");
        } else {
            const errorData = await response.json();
            setError(errorData.message || "Ocurrió un error durante el registro.");
        }
    } catch (error) {
        setError("Error al registrarse. Inténtalo de nuevo más tarde.");
        console.error(error);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form_area">
        <p className="title">REGISTRO</p>
        <form onSubmit={handleSubmit}>
          <div className="form_group">
            <label className="sub_title" htmlFor="nombre">Nombre Completo</label>
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
            <label className="sub_title" htmlFor="correo">Correo</label>
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
            <label className="sub_title" htmlFor="contrasenia">Contraseña</label>
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
          <div className="form_group">
            <label className="sub_title" htmlFor="edad">Edad</label>
            <input
              placeholder="Introduzca su edad"
              className="form_style"
              type="number"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form_group">
            <label className="sub_title" htmlFor="sexo">Sexo</label>
            <select
              name="sexo"
              className="form_style"
              value={formData.sexo}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona Sexo</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <div className="form_group">
            <label className="sub_title" htmlFor="numeroCelular">Número de Celular</label>
            <input
              placeholder="Introduzca su número de celular"
              className="form_style"
              type="tel"
              name="numeroCelular"
              value={formData.numeroCelular}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form_group"> 
            <label className="sub_title" htmlFor="rol">¿Qué desea en la app?</label>
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
            <button className="btn" type="submit" disabled={isLoading}>
              {isLoading ? "Cargando..." : "CREAR CUENTA"}
            </button>
            {error && <p className="error-message">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;

