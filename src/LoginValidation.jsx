function Validation(values){
    let error = {}
   
    if(values.usuario === ""){
     error.usuario = "Debe ingresar su usuario"
    }else{
     error.usuario = ""
    }
 
    if(values.password === ""){
     error.password = "Contraseña incorrecta"
    }else{
     error.password = ""
    }
 
    return error;
 }
 
 export default Validation;