export default function inputValidations(input) {
    
const errors = {};
if(input.name){
    if(input.name.trim()=== ""){
        errors.name = "Must add a first name"
    }
    else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(input.name.trim())){
        errors.name = "Must not include special characters"
    }
    else if(input.name.length < 3 || input.name.length > 30){
        errors.name = "Must be between 3 and 30 characters"
    }
}

if(input.last_name){
    if(input.last_name.trim()=== ""){
        errors.last_name = "Must add a last name"
    }
    else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(input.last_name.trim())){
        errors.last_name = "Must not include special characters"
    }
    else if(input.last_name.length < 3 || input.last_name.length > 30){
        errors.last_name = "Must be between 3 and 30 characters"
    }
}
if(input.address){
    if(input.address.trim()=== ""){
        errors.address = "Must add an address"
    }
}

if(input.phone_number){
    if(input.phone_number.trim()=== ""){
        errors.phone_number = "Must add a phone number"
    }
    else if (!/^[0-9]*$/.test(input.phone_number)){
        errors.phone_number = "Must be a number"
    }  
}

    return errors;
}

