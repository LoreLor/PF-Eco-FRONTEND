export default function activeValidations(user) {
    console.log(user)
    let errors = {};

if(user.prev_password){
    if(user.prev_password.trim()=== ""){
        errors.prev_password = "Must add your actual password"
    }
    else if(user.prev_password.length < 8){
        errors.prev_password = "Must be at least 8 characters"
    }
}

if(user.new_password){
    if(user.new_password.trim()=== ""){
        errors.new_password = "Must add your new password"
    }
    else if(user.new_password.length < 8){
        errors.new_password = "Must be at least 8 characters"
    }
}

if(user.conf_password){
    if(user.conf_password.trim()=== ""){
        errors.conf_password = "Must confirm your password"
    }
    else if(user.conf_password !== user.new_password){
        errors.conf_password= "Passwords do not match"
    }
}
    return errors;
  }