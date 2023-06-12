import React, { useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import { AuthContext } from "./AuthContext";

function App() {
  const { isAuthenticated, setAuthentication } = useContext(AuthContext);

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth) {
      setAuthentication(true);
    }
  }, [setAuthentication]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
