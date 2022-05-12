export default function productValidations(input,products){
console.log(input)
console.log(parseInt(input.price))
    let errors={}
if(input.name){
    if(input.name.trim()=== ""){
        errors.name = "Se requiere un nombre para crear el producto"
    }
    else if(!/^[A-Za-z0-9\s]+$/g.test(input.name.trim())){
        errors.name = "El nombre no debe incluir caracteres especiales"
    }
    else if(input.name.length < 5 || input.name.length > 30){
        errors.name = "El nombre debe tener entre 5 y 30 caracteres"
    }
    var checkDb = products && products.filter(product => product.name.toLowerCase() === input.name.toLowerCase())
    if(checkDb && checkDb.length > 0){errors.name = "El producto ya existe"}
}
    if(!input.price){ 
    errors.price = "Es necesario un precio"
    }
    else if (!/^[0-9]*$/.test(input.price)){
    errors.price = "El valor debe ser un numero"
    }

    if(!input.description){
    errors.description = "El producto debe tener una descripción"
    }

    if(!input.stock){ 
        errors.stock = "Es necesario un precio"
        }
    else if (!/^[0-9]*$/.test(input.stock)){
    errors.stock = "El valor debe ser un numero"
    }

    if(!input.img){
        errors.img = "El producto debe tener al menos una imagen"
        }
return errors
}