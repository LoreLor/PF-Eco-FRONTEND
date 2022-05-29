export default function submitValidations(input){
    let errors = {}
    if (input.rol !== "admin" && input.rol !=="user"){errors.rol = "The rol can not be hacked"}
    return errors
}