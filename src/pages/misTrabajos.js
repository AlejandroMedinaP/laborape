import React, { useState, useEffect, useContext } from "react";
import { Box, Grid, Alert } from "@mui/material";
import MisTrabajosCard from "@/components/trabajos/MisTrabajosCard";
import LogoBar from "@/components/layout/LogoBar";
import { AppContext } from "@/context/AppContext";

const MisTrabajos = () => {
  const { user } = useContext(AppContext);
  const [trabajos, setTrabajos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrabajos = async () => {
      if (!user) {
        setError("Debes iniciar sesión para ver tus trabajos.");
        return;
      }
      try {
        const response = await fetch(`http://localhost:8080/trabajos/cliente/${user.idusuario}`);
        if (!response.ok) {
          throw new Error("Error HTTP! status: " + response.status);
        }
        const data = await response.json();
        setTrabajos(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTrabajos();
  }, [user]);

  const handleEdit = (trabajo) => {
    console.log("Editando trabajo:", trabajo);
  };

  const handleDelete = async (idtrabajo) => {
    try {
      const response = await fetch(`http://localhost:8080/trabajos/${idtrabajo}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error("Error HTTP! status: " + response.status);
      }
      setTrabajos(trabajos.filter(trabajo => trabajo.idtrabajo !== idtrabajo));
    } catch (err) {
      setError(err.message);
    }
  };

  if (!user) {
    return (
      <div className="container">
        <LogoBar />
        <h1 className="title">Mis Trabajos</h1>
        <Box className="trabajos-container">
          <Alert severity="error">Debes iniciar sesión para ver tus trabajos.</Alert>
        </Box>
      </div>
    );
  }

  return (
    <div className="container">
      <LogoBar />
      <h1 className="title">Mis Trabajos</h1>
      <Box className="trabajos-container">
        {error && <Alert severity="error">{error}</Alert>}
        <Grid container spacing={2}>
          {trabajos.map((trabajo) => (
            <Grid item key={trabajo.idtrabajo}>
              <MisTrabajosCard
                trabajo={trabajo}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default MisTrabajos;
