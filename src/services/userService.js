export const register = async (body) => {
    try {
        /* const username = 'user';
const password = '67c7122a-25c3-4f87-aee6-4680a5bfd111';

        const headers = new Headers();
      headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));
      headers.set('Content-Type', 'application/json'); */

      const response = await fetch("http://localhost:8080/api/usuario/register", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body
      });
      if (!response.ok) {
        throw new Error('Bad Response');
      }
      //const data = await response.json();
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
};