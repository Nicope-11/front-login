import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función para actualizar el estado de autenticación
  const setAuthentication = (value) => {
    setIsAuthenticated(value);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthentication }}>
      {children}
    </AuthContext.Provider>
  );
};
