import React, { useState, useEffect  } from 'react'
import Validation from './LoginValidation';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import logo from "./img/logo.png";

function Login(){
        const [values, setValues] = useState({
            usuario: '',
            password: ''
        })
        const navigate = useNavigate();

        const [errors, setErrors] = useState({})
        const handleInput =(event) =>{
            setValues(prev => ({...prev, [event.target.name]:event.target.value.toString()}))
        }
        const handleSubmit =(event) => {
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
              
    return  (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
           <div className='bg-white p-3 rounded w-25'>
            <img src={logo} style={{width : "250px"}} alt=""/>
            <form action="" onSubmit={handleSubmit}>
                <div className='mt-3'>
                    <label htmlFor="Usuario"><strong>Usuario</strong></label>
                    <input type="usuario" placeholder='Usuario' name='usuario'
                    onChange={(e) => setValues({ ...values, usuario: e.target.value })} className='form-control rounded-0' required autoComplete='off'/>
                    {errors.usuario && <span className='text-danger'>{errors.usuario}</span>}
                </div>
                <div className='mt-2'>
                    <label htmlFor= 'password' ><strong>Contraseña</strong></label>
                    <input type="password" placeholder='Contraseña' name="password"
                    onChange={(e) => setValues({ ...values, password: e.target.value })} className='form-control rounded-0' required autoComplete='off'/>
                    {errors.password && <span className='text-danger'>{errors.password}</span>}
                </div>
                <button type='submit' className='btn btn-success w-100 mt-3 rounded-pill'>Iniciar sesión</button>
            </form>
            </div> 
        </div>
    )
}

export default Login