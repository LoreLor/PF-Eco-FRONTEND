export default function activeValidations (name,input,categories){
    let errors = {}
    if(input.name){
        if(input.name.trim()=== ""){
            errors.name = "Must have a name"
        }
        else if(input.name.length < 2 || input.name.length > 30){
            errors.name = "Must be between 2 and 30 characters"
        }
        if(!name){let checkDb = categories && categories.filter(category => category.name.toLowerCase() === input.name.toLowerCase())
            if(checkDb && checkDb.length > 0){errors.name = "Category already exists"}}
        else if(name){
            let preData = categories && categories.filter(category => category.name.toLowerCase() !== name.name.toLowerCase())
            console.log(preData)
            let checkDb = preData && preData.filter(category => category.name.toLowerCase() === input.name.toLowerCase())
            if(checkDb && checkDb.length > 0){errors.name = "Category already exists"}
        }
    }
    return errors
}