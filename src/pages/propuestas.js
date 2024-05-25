import { useState } from 'react';
import { Button, Box, Grid, Typography, Card, CardActions, CardContent, CardMedia, Pagination } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import PropuestaCard from '@/components/PropuestaCard';

import LogoBar from '@/components/LogoBar';
//import LaboraPe from '@/Imagenes/LaboraPe.png';

/* const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
})); */

const itemsPerPage = 4;

const Propuestas = () => {
  /* const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  }; */

  const [page, setPage] = useState(1);
  
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const propuestas = [
    {
      id: 1,
      imagen: '../Imagenes/logoLA.jpg',
      nombre: 'Nombre Propuesta 1',
      descripcion: 'Descripción breve de la Propuesta 1'
    },
    {
      id: 2,
      imagen: '../Imagenes/logoLA.jpg',
      nombre: 'Nombre Propuesta 2',
      descripcion: "Descripción breve de la Propuesta 2"
    },
    {
      id: 3,
      imagen: '../Imagenes/logoLA.jpg',
      nombre: 'Nombre Propuesta 3',
      descripcion: 'Descripción breve de la Propuesta 3'
    },
    {
      id: 4,
      imagen: '../Imagenes/logoLA.jpg',
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
  ];

  const totalPages = Math.ceil(propuestas.length / itemsPerPage);

  const currentItems = propuestas.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="container">
      <LogoBar></LogoBar>
      <h1>Freelancer Proposals for Job Applicant</h1>
      <Box sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          {currentItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box sx={{ border: '1px solid grey', padding: 2, borderRadius: 2 }}>
                <PropuestaCard 
                  id={item.id}
                  nombre={item.nombre}
                  descripcion={item.descripcion}
                  image={item.imagen}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        </Box>
      </Box>

      {/* <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Propuesta 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image="../Imagenes/logoLA.jpg"
              title="propuesta1"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Nombre Propuesta 1
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Ver Detalle</Button>
              
            </CardActions>
          </Card>
        </AccordionDetails>
      </Accordion>
      {propuestas.map(propuesta => (
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary aria-controls="panel2d-content" id={propuesta.id}>
            <Typography>{`Propuesta ${propuesta.id}`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="propuesta-card">
              <img src="../Imagenes/logoLA.jpg" alt="Imagen Propuesta 2" />
              <h2>{propuesta.nombre}</h2>
              <p>{propuesta.descripcion}</p>
              <div className="botones">
                <Button>Ver Detalle</Button>
                <Button>Aceptar</Button>
              </div>
            </div>
           
          </AccordionDetails>
        </Accordion>
      ))} */}

      {/* <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Propuesta 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="propuesta-card">
            <img src="../Imagenes/logoLA.jpg" alt="Imagen Propuesta 2" />
            <h2>{propuesta.nombre}</h2>
            <p>{propuesta.descripcion}</p>
            <div className="botones">
              <button>View Profile</button>
              <button>Aceptar</button>
            </div>
          </div>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Propuesta 3</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
}

export default Propuestas;

/* class propuestas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propuestas: [
        {
          id: 1,
          imagen: 'ruta-imagen-1',
          nombre: 'Nombre Propuesta 1',
          descripcion: 'Descripción breve de la Propuesta 1'
        },
        {
          id: 2,
          imagen: 'ruta-imagen-2',
          nombre: 'Nombre Propuesta 2',
          descripcion: 'Descripción breve de la Propuesta 2'
        },
        // Puedes agregar más propuestas según sea necesario
      ]
    };
  }

  render() {
    const { propuestas } = this.state;

    return (
      <div className="container">
        <LogoBar></LogoBar>
        <h1>Freelancer Proposals for Job Applicant</h1>
        {propuestas.map(propuesta => (
          <div key={propuesta.id} className="propuesta-card">
            <img src={propuesta.imagen} alt="Imagen Propuesta" />
            <h2>{propuesta.nombre}</h2>
            <p>{propuesta.descripcion}</p>
            <div className="botones">
              <button>View Profile</button>
              <button>Aceptar</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default propuestas; */