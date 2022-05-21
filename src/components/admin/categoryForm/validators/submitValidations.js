export default function activeValidations (name,input,categories){
    let errors = {}

    if(!name){let checkDb = categories && categories.filter(category => category.name.toLowerCase() === input.name.toLowerCase())
        if(checkDb && checkDb.length > 0){errors.name = "Category already exists"}}
    else if(name){
        let preData = categories && categories.filter(category => category.name.toLowerCase() !== name.name.toLowerCase())
        let checkDb = preData && preData.filter(category => category.name.toLowerCase() === input.name.toLowerCase())
        if(checkDb && checkDb.length > 0){errors.name = "Category already exists"}
        }

    if(!input.name){
         errors.name = "Must have a name"
        }
    return errors
}