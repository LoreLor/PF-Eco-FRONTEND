export default function activeValidations(user) {
    let errors = {};
if(user.name){
    if(user.name.trim()=== ""){
        errors.name = "Must add a first name"
    }
    else if(!/^[A-Za-z\s]+$/g.test(user.name.trim())){
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
    else if(!/^[A-Za-z0-9\s]+$/g.test(user.last_name.trim())){
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
    else if(!/^[A-Za-z0-9\s]+$/g.test(user.user_name.trim())){
        errors.user_name = "Must not include special characters"
    }
    else if(user.last_name.length < 5 || user.last_name.length > 20){
        errors.user_name = "Must be between 5 and 20 characters"
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
        errors.user_name = "Must be at least 8 characters"
    }
}

    /* if (user.name.length < 4) {
      errors.name = "you must enter a Name";
    } else if (/[^a-zA-Z ]/g.test(user.firstName)) {
      errors.name = "Only text";
    } */

/*     if (!user.address) {
      errors.address = "you must enter an address";
    }
    if (user.dni.length < 3) {
      errors.dni = "DNI is required";
    } else if (/[^0-9]/g.test(user.dni)) {
      errors.dni = "Received only numbers";
    }
    if (user.phone_number.length < 3) {
      errors.phone = "Phone is required";
    } else if (/[^0-9]/g.test(user.phone_number)) {
      errors.phone_number = "Received only numbers";
    } */
    return errors;
  }