import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./img/logo.png";
import TextField from "@mui/material/TextField";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Login() {
  const [values, setValues] = useState({
    usuario: "",
    password: "",
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const checkUserExistence = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/checkUserExistence",
        { usuario: values.usuario }
      );
      const data = response.data;

      if (!data.exists) {
        setErrors((prev) => ({
          ...prev,
          usuario: "Este usuario no existe",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          usuario: "",
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8081/login", values);
      const data = response.data;

      if (data === "Success") {
        navigate("/home");
      } else {
        setErrors((prev) => ({
          ...prev,
          password: "Contraseña incorrecta",
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const passwordAdornment = (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
        edge="end"
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );

  useEffect(() => {
    if (values.usuario !== "") {
      checkUserExistence();
    }
  }, [values.usuario]);

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <img src={logo} style={{ width: "250px" }} alt="" />
        <form action="" onSubmit={handleSubmit}>
          <Box marginTop="20px">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Usuario"
              variant="outlined"
              error={Boolean(errors.usuario)}
              helperText={errors.usuario}
              onChange={handleChange}
              name="usuario"
              autoComplete="off"
            />
          </Box>

          <Box>
            <FormControl
              fullWidth
              sx={{ mt: 3 }}
              variant="outlined"
              error={Boolean(errors.password)}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Contraseña
              </InputLabel>
              <OutlinedInput
                onChange={handleChange}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={passwordAdornment}
                label="Contraseña"
                name="password"
              />
              {errors.password && (
                <FormHelperText>{errors.password}</FormHelperText>
              )}
            </FormControl>
          </Box>

          <Button type="submit" fullWidth sx={{ mt: 3 }} variant="contained">
            Iniciar sesión
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;



