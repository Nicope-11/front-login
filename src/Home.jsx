import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { Button, TextField } from "@mui/material";

function Home() {
  const navigate = useNavigate();
  const { isAuthenticated, setAuthentication } = useContext(AuthContext);
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar si el usuario es "admin"
    if (username !== "admin") {
      setErrorMessage("Acceso no autorizado");
      return;
    }

    // Enviar la solicitud POST para crear un nuevo usuario
    fetch("http://localhost:8081/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setErrorMessage(data.message);
        } else {
          // Usuario creado exitosamente
          setUsername("");
          setPassword("");
          setErrorMessage("");
          alert("Usuario creado exitosamente");
        }
      })
      .catch((error) => {
        console.error("Error al crear el usuario:", error);
      });
  };

  const handleLogout = () => {
    // Realizar cualquier operación necesaria para cerrar la sesión
    setAuthentication(false);
    navigate("/");
  };

  return (
    <div>
      <h1>¡Bienvenido!</h1>
      {username === "admin" ? <form onSubmit={handleSubmit}>
        <h2>Crear usuario nuevo</h2>
        {errorMessage && <p>{errorMessage}</p>}
        <div>
          <TextField
            label="Nombre de usuario"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <TextField
            label="Contraseña"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <Button variant="contained" type="submit">
          Crear usuario
        </Button>
      </form>:""}
      

      <Button variant="contained" onClick={handleLogout}>
        Cerrar sesión
      </Button>
    </div>
  );
}

export default Home;