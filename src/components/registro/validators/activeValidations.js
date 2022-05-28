export default function activeValidations(user) {
    
    let errors = {};
if(user.name){
    if(user.name.trim()=== ""){
        errors.name = "Must add a first name"
    }
    else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(user.name.trim())){
        errors.name = "Must not include special characters"
    }
    else if(user.name.length < 3 || user.name.length > 30){
        errors.name = "Must be between 3 and 30 characters"
    }
}

if(user.last_name){
    if(user.last_name.trim()=== ""){
        errors.last_name = "Must add a last name"
    }
    else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(user.last_name.trim())){
        errors.last_name = "Must not include special characters"
    }
    else if(user.last_name.length < 3 || user.last_name.length > 30){
        errors.last_name = "Must be between 3 and 30 characters"
    }
}

if(user.user_name){
    if(user.user_name.trim()=== ""){
        errors.user_name = "Must add a username"
    }
/*     else if(!/^[A-Za-z0-9\s]+$/g.test(user.user_name.trim())){
        errors.user_name = "Must not include special characters"
    } */
    else if(user.user_name.length < 3 || user.user_name.length > 20){
        errors.user_name = "Must be between 3 and 20 characters"
    }
}

if(user.email){
    if(user.email.trim()=== ""){
        errors.email = "Must add a email"
    }
    else if(!/\S+@\S+\.\S+/.test(user.email.trim())){
        errors.email = "Must be a valid email"
    }
}

if(user.password){
    if(user.password.trim()=== ""){
        errors.password = "Must add a password"
    }
    else if(user.password.length < 8){
        errors.password = "Must be at least 8 characters"
    }
}

if(user.address){
    if(user.address.trim()=== ""){
        errors.address = "Must add an address"
    }
}

if(user.phone_number){
    if(user.phone_number.trim()=== ""){
        errors.phone_number = "Must add a phone number"
    }
    else if (!/^[0-9]*$/.test(user.phone_number)){
        errors.phone_number = "Must be a number"
    }  
}

    return errors;
  }