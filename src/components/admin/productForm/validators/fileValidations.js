export default function fileValidations(input,file){
    let errors = {}

    var filelength = file.length? file.length : 0
    if(input.img.length + filelength > 5){
        errors.img = "Five pictures max"
        }
    if(input.img.length + filelength <= 0){
        errors.img = "Upload at least one picture"
        }

    return errors
}