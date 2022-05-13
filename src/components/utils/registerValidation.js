export function registerValidate(user){
    let errors={};
    if(!user.name && /\d/.teste(user)){
        errors.name="You must enter a name"
    }
    if(!user.last_name){
        errors.last_name="you must enter a last_name"
    }
    if(!user.email && /\S+@\S+\+/.test(user)){
        errors.email="you must enter a valid email"
    }
    if(!user.password){
        errors.password="you must enter a valid password"
    }
    if(!user.address.street){
        errors.address.street="you must enter an street"
    }
    if(!user.address.postal_code){
        errors.address.postal_code="you must enter a postal_code"
    }
    if(!user.address.city){
        errors.address.city="you must enter a city"
    }
    if(!user.address.country){
        errors.address.country="you must enter a country"
    }

}
