/* export const getPropuestas = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'http://localhost:3000/api/propuestas/propuesta',
        },
      });
      if (!response.ok) {
        throw new Error('Bad Response');
      }
      //const data = await response.json();
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
}; */
/* 
export const enviarPropuesta = async (url, body) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
<<<<<<< HEAD
          'Content-Type': 'http://localhost:3000/api/propuestas/',
=======
          'Content-Type': 'http://localhost:3000/api/propuestas/enviar',
>>>>>>> 5b157e14505d0a53f5d5fb8d5d3b8f333c5a8590
        },
        body
      });
      if (!response.ok) {
        throw new Error('Bad Response');
      }
      //const data = await response.json();
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
}; */