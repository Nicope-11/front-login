import React, { createContext, useState } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  user: "",
  setAuthentication: () => {},
  updateUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState("");

  // Función para actualizar el estado de autenticación
  const setAuthentication = (value) => {
    setIsAuthenticated(value);
  };

  // Función para actualizar el usuario autenticado
  const updateUser = (username) => {
    setUser(username);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, setAuthentication, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
