import React, { Component } from 'react';
import { Box, Grid, Pagination } from '@mui/material';
import PropuestaCard from '@/components/PropuestaCard';
import LogoBar from '@/components/LogoBar';
import DetallePropuesta from '@/components/DetallePropuesta';

const itemsPerPage = 4;

class Propuestas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      openMasDetalle: false,
      propuestaSelected: {},
      propuestas: [],
    };
  }

  componentDidMount() {
    this.fetchPropuestas();
  }

  fetchPropuestas = async () => {
    try {
      const response = await fetch('http://localhost:3100/api/propuestas'); // URL de tu API
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const propuestas = await response.json();
      this.setState({ propuestas });
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  handleChangePage = (event, value) => {
    this.setState({ page: value });
  };

  handleVerDetalle = (id) => {
    this.setState({
      openMasDetalle: true,
      propuestaSelected: this.state.propuestas.find((propuesta) => propuesta.id === id) || {},
    });
  };

  handleCloseDetalle = () => {
    this.setState({ openMasDetalle: false });
  };

  render() {
    const { page, openMasDetalle, propuestaSelected, propuestas } = this.state;
    const totalPages = Math.ceil(propuestas.length / itemsPerPage);
    const currentItems = propuestas.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
      <div className="container">
        <LogoBar />
        <h1>Propuestas de trabajo</h1>
        <Box sx={{ padding: 2 }}>
          <Grid container spacing={2}>
            {currentItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box sx={{ border: '1px solid grey', padding: 2, borderRadius: 2 }}>
                  <PropuestaCard
                    id={item.id}
                    nombre={item.nombre}
                    descripcion={item.descripcion}
                    image={`/imagenes/${item.imagen}`}
                    detalle={() => this.handleVerDetalle(item.id)}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={this.handleChangePage}
              color="primary"
            />
          </Box>
        </Box>
        <DetallePropuesta 
          open={openMasDetalle}
          handleClose={this.handleCloseDetalle}
          propuesta={propuestaSelected}
        />
      </div>
    );
  }
}

export default Propuestas;