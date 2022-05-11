export default function categoryValidations (input,categories){
    let errors = {}
    if(input.name){
        if(input.name.trim()=== ""){
            errors.name = "Se requiere un nombre para crear una categoria"
        }
        else if(!/^[A-Za-z\u00f1\u00d1\s]+$/g.test(input.name.trim())){
            errors.name = "El nombre no debe incluir caracteres especiales"
        }
        else if(input.name.length < 2 || input.name.length > 30){
            errors.name = "El nombre debe tener entre 2 y 30 caracteres"
        }
        var checkDb = categories && categories.filter(category => category.name.toLowerCase() === input.name.toLowerCase())
        if(checkDb && checkDb.length > 0){errors.name = "La categoria ya existe"}
    }
    return errors
}