import React from 'react';
import { AppProvider } from '../context/AppContext';
import '../styles/login.css';
import '../styles/register.css';
import '../styles/postulacionFree.css';
import '../styles/barra.css';

function MyApp({ Component, pageProps }) {
    return (
      <AppProvider>
        <Component {...pageProps} />;
      </AppProvider>
    )
  }
  
  export default MyApp;