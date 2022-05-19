export default function productValidations(id,input,products){

    let errors={}
if(input.name){
    if(input.name.trim()=== ""){
        errors.name = "Must have a name"
    }
    else if(!/^[A-Za-z0-9\s]+$/g.test(input.name.trim())){
        errors.name = "Must not include special characters"
    }
    else if(input.name.length < 5 || input.name.length > 30){
        errors.name = "Must be between 5 and 30 characters"
    }
    if(!id){ let checkDb = products && products.filter(product => product.name.toLowerCase() === input.name.toLowerCase())
        if(checkDb && checkDb.length > 0){errors.name = "Product already exists"}}
    else if(id){ 
        let preData = products && products.filter(product => product.id !== id)
        let checkDb = preData && preData.filter(product => product.name.toLowerCase() === input.name.toLowerCase())
        if(checkDb && checkDb.length > 0){errors.name = "Product already exists"} }

}
    if(input.price){
        if(input.price.trim()=== ""){
            errors.price = "Must have a price"
        }
        else if (!/^[0-9]*$/.test(input.price)){
            errors.price = "Must be a number"
            }
    }
    
    if(input.description){
    if(input.description.trim()=== ""){
    errors.description = "Must have a description"
    }}


    if(input.stock){
        if(input.stock.trim()=== ""){
            errors.stock = "Must have a description"}
        else if (!/^[0-9]*$/.test(input.stock)){
            errors.stock = "Must be a number"
        }    
    }

    /* if(!input.img){
        errors.img = "El producto debe tener al menos una imagen"
        } */
return errors
}