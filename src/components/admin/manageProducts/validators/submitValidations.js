export default function submitValidations(id,input,products,file){
    let errors={}
    
    if(!id){ let checkDb = products && products.filter(product => product.name.toLowerCase() === input.name.toLowerCase())
        if(checkDb && checkDb.length > 0){errors.name = "The product already exists"}}
    else if(id){ 
        let preData = products && products.filter(product => product.id !== id.id)
        let checkDb = preData && preData.filter(product => product.name.toLowerCase() === input.name.toLowerCase())
        if(checkDb && checkDb.length > 0){errors.name = "The product already exists"} 
    }

    if(!input.name){
        errors.name = "Must have a name"
    }
    if(!input.price){
        errors.price = "Must have a price"
    }
    if(!input.description){
        errors.description = "Must have a description"
    }
    if(!input.stock){
        errors.stock = "Must have a stock"
    }
    if(input.categories.length === 0){
        errors.categories = "Must have at least one category"
    }

return errors
}