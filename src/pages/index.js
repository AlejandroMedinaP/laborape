import React from 'react';
import { useRouter } from 'next/router';


export default function IndexPage() {
  const router = useRouter();

  React.useEffect(() => {
    router.push('/login'); 
  }, []);

  return (
    <div>
      <h1>Bienvenido a mi aplicación</h1>
      <p>Serás redirigido a la página de inicio de sesión en breve.</p>
    </div>
  );
}