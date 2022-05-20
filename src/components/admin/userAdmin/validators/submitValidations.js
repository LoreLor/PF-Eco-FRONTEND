export default function submitValidations(input){
    let errors = {}
    if (input.rol !== "Admin" && input.rol !=="User"){errors.isActive = "The rol can not be hacked"}
    return errors
}