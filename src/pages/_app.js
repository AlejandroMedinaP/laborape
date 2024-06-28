import React from 'react';
import { AppProvider } from '../context/AppContext';
import '../styles/global/login.css';
import '../styles/global/register.css';
import '../styles/global/postulacionFree.css';
import '../styles/global/barra.css';
import '../styles/global/propuestas.css';
import '../styles/global/formulario.css';
import '../styles/global/misTrabajos.module.css';
import '../styles/global/MisTrabajosCard.module.css';
import '../styles/global/EditarTrabajoModal.module.css';

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;