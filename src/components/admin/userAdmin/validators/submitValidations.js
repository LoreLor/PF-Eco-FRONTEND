export default function submitValidations(input){
    let errors = {}
    if(input.isActive !== "Active" && input.isActive !=="Inactive"){errors.isActive = "The status can not be hacked"}
    else if (input.rol !== "Admin" && input.rol !=="User"){errors.isActive = "The rol can not be hacked"}
    return errors
}