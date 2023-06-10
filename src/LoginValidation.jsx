function Validation(values){
    let error = {}
   
    if(values.usuario === ""){
     error.usuario = "Debe ingresar su usuario"
    }else{
     error.usuario = ""
    }
 
    if(values.password === ""){
     error.password = "Debe poner su contraseña"
    }else{
     error.password = ""
    }
 
    return error;
 }
 
 export default Validation;