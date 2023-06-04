import React, { useState, useEffect } from 'react'
import Validation from './LoginValidation';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import logo from "./img/logo.png";
import TextField from '@mui/material/TextField';
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Login() {
  const [values, setValues] = useState({
    usuario: '',
    password: ''
  })
  const navigate = useNavigate();

  const [errors, setErrors] = useState({})
  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value.toString() }))
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
  }

  useEffect(() => {
    if (errors.usuario === "" && errors.password === "") {
      axios.post('http://localhost:8081/login', values)
        .then(res => {
          if (res.data === "Success") {
            navigate('/home');
          } else {
            console.log(res);
          }
        })
        .catch(err => console.log(err));
    }
  }, [errors]);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  }
  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <img src={logo} style={{ width: "250px" }} alt="" />
        <form action="" onSubmit={handleSubmit}>
          <Box marginTop="20px">
            <TextField fullWidth id="outlined-basic" label="Usuario" variant="outlined"
              onChange={(e) => setValues({ ...values, usuario: e.target.value })} autoComplete='off' />
          </Box>

          <Box>
          <FormControl fullWidth sx={{ mt: 3,}} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
          <OutlinedInput
          onChange={(e) => setValues({ ...values, password: e.target.value })}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
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
            }
            label="Contraseña"
          />
        </FormControl>
          </Box>

          <Button type='submit' fullWidth sx={{ mt: 3,}} variant="contained">Iniciar sesión</Button>
          
        </form>
      </div>
    </div>
  )
}

export default Login