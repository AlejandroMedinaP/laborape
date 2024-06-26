import React, { useEffect, useState, useContext } from "react";
import { Box, Grid, Pagination, CircularProgress, Alert } from "@mui/material";
import { AppContext } from "@/context/AppContext";
import { getPropuestas, enviarPropuesta } from "@/services/apiService";
import PropuestaCard from "@/components/propuestas/PropuestaCard";
import LogoBar from "@/components/layout/LogoBar";
import DetallePropuesta from "@/components/propuestas/DetallePropuesta";

const itemsPerPage = 4;

class Propuestas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      openMasDetalle: false,
      propuestaSelected: {},
      propuestas: [
        {
          id: 1,
          imagen: 'grieta.jpg',
          nombre: 'Albañilería - Reparación de Pared Agrietada',
          descripcion: 'Hola, necesito ayuda urgente con una de las paredes de mi casa. Noté que hay varias grietas que han ido creciendo con el tiempo. La pared está en una habitación que usamos frecuentemente y me preocupa que esto pueda empeorar y comprometer la estructura. No solo es un problema estético, sino que temo que pueda haber problemas más serios detrás de estas grietas. Necesito que alguien venga a evaluarlo y me dé una solución para repararlo lo antes posible'
        },
        {
          id: 2,
          imagen: 'descascarado.jpg',
          nombre: 'Pintura - Pintura Descascarada en la Fachada',
          descripcion: "Buenos días, tengo un problema con la pintura de la fachada de mi casa. La pintura se está descascarando en varias áreas y se ve realmente mal. Vivimos cerca del mar, así que la salinidad y la humedad han acelerado el deterioro. Quiero que la fachada vuelva a lucir bien, pero también necesito que la nueva pintura sea resistente a estas condiciones. Estoy buscando a un profesional que pueda raspar la pintura vieja, preparar adecuadamente la superficie y aplicar una pintura de calidad que dure más tiempo."
        },
        {
          id: 3,
          imagen: 'goteo.jpg',
          nombre: 'Fontanería - Goteo en el Lavabo del Baño',
          descripcion: 'Hola, tengo un problema con el lavabo del baño. La llave del agua gotea constantemente, incluso cuando está cerrada. El sonido del goteo es molesto y me preocupa el desperdicio de agua. He intentado apretar la llave yo mismo, pero no ha funcionado. Necesito que un fontanero venga a revisar y arreglar este problema lo antes posible. No quiero que el goteo cause algún daño mayor o que la factura de agua siga subiendo por esto'
        },
        {
          id: 4,
          imagen: 'logoLA.jpg',
          nombre: 'Nombre Propuesta 4',
          descripcion: 'Descripción breve de la Propuesta 4'
        },
        {
          id: 5,
          imagen: '../Imagenes/logoLA.jpg',
          nombre: 'Nombre Propuesta 5',
          descripcion: 'Descripción breve de la Propuesta 5'
        },
        {
          id: 6,
          imagen: '../Imagenes/logoLA.jpg',
          nombre: 'Nombre Propuesta 6',
          descripcion: 'Descripción breve de la Propuesta 6'
        },
        // Puedes agregar más propuestas según sea necesario
      ],
      propuestaEnviada: {},
    };
  }

  componentDidMount() {
    this.fetchPropuestas();
  }

  fetchPropuestas = async () => {
    try {
      const response = await getPropuestas('C:\Users\leona\OneDrive\Escritorio\LaboraPe\laborape\src\services\propuestas.json');
      if (response) {
        this.setState({ propuestas: response.data });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  handleChangePage = (event, value) => {
    this.setState({ page: value });
  };

  const handleVerDetalle = (id) => {
    setOpenMasDetalle(true);
    setPropuestaSelected(propuestas.find((propuesta) => propuesta.id === id) || {});
  };

  const handleCloseDetalle = () => {
    setOpenMasDetalle(false);
  };

  enviarPropuesta = async () => {
    try {
      // Agregar el id del freelancer a los datos de la propuesta
      propuestaData.idfreelancer = user.idusuario; // Suponiendo que el id del usuario está en el contexto

      const response = await enviarPropuesta(propuestaData);
      if (response.ok) {
        console.log("Propuesta enviada con éxito");
        handleCloseDetalle(); 
        // Aquí puedes actualizar la lista de propuestas si es necesario
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Error al enviar la propuesta");
      }
    } catch (error) {
      setError("Error al enviar la propuesta. Inténtalo de nuevo más tarde.");
      console.error(error);
    }
  }

  render() {
    const { page, openMasDetalle, propuestaSelected, propuestas } = this.state;
    const totalPages = Math.ceil(propuestas.length / itemsPerPage);
    //const currentItems = propuestas.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="container">
      <LogoBar />
      <h1>Propuestas de trabajo</h1>

      {isLoading ? ( 
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
          <CircularProgress /> {/* Indicador de carga */}
        </Box>
      ) : error ? ( // Mostrar mensaje de error si hay un error
        <Alert severity="error">{error}</Alert>
      ) : (
        <Box sx={{ padding: 2 }}>
          <Grid container spacing={2}>
            {propuestas
              .filter((c, index) => (page - 1) * itemsPerPage <= index && index < page * itemsPerPage)
              .map((item, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Box sx={{ border: '1px solid grey', padding: 2, borderRadius: 2 }}>
                    <PropuestaCard
                      id={item.id}
                      nombre={item.titulo} // Cambiado a 'titulo' para que coincida con el backend
                      descripcion={item.descripcion}
                      image={`/imagenes/${item.imagen}`}
                      detalle={() => handleVerDetalle(item.id)}
                    />
                  </Box>
                </Grid>
              ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <Pagination
              count={Math.ceil(propuestas.length / itemsPerPage)}
              page={page}
              onChange={handleChangePage}
              color="primary"
            />
          </Box>
        </Box>
        <DetallePropuesta 
          open={openMasDetalle}
          handleClose={this.handleCloseDetalle}
          propuesta={propuestaSelected}
          enviar={this.enviarPropuesta}
        />
      </div>
    );
  }
}

export default Propuestas;
