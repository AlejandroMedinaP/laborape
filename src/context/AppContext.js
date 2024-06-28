import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    console.log("Stored User:", storedUser); // Añade este log para verificar
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};
