export default function submitValidations(id,input,products){
    let errors={}
    
    if(!id){ let checkDb = products && products.filter(product => product.name.toLowerCase() === input.name.toLowerCase())
        if(checkDb && checkDb.length > 0){errors.name = "El producto ya existe"}}
    else if(id){ 
        let preData = products && products.filter(product => product.id !== id)
        let checkDb = preData && preData.filter(product => product.name.toLowerCase() === input.name.toLowerCase())
        if(checkDb && checkDb.length > 0){errors.name = "El producto ya existe"} }

    if(!input.name){
        errors.name = "Se requiere un nombre para crear el producto"
    }
    if(!input.price){
        errors.price = "Es necesario un precio"
    }
    if(!input.description){
        errors.description = "El producto debe tener una descripción"
    }
    if(!input.stock){
        errors.stock = "Es necesario un valor de inventario"
    }
    if(!input.categories){
        errors.categories = "Es necesario agregar al menos una categoria"
    }
    
    /* if(!input.img){
        errors.img = "El producto debe tener al menos una imagen"
        } */
return errors
}