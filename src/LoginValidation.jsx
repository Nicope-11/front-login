function Validation(values){
    alert("")
    let error = {}
 
 
    if(values.usuario === ""){
     error.usuario = "Este usuario no existe"
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