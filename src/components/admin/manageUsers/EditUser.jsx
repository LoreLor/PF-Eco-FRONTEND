import React,{useEffect,useState} from "react"
import {useDispatch} from "react-redux"
import axios from "axios"
import submitValidations from "./validators/submitValidations"
import { getAllUsers } from "../../../redux/actions/user"
import capitalize from '../adminPage/Capitalize'
import style from './EditUser.module.css'
import SERVER from "../../../server"
import { toast } from "react-toastify"

export default function EditUser({user,setUserEdit}){
    const dispatch = useDispatch()
 
    const [errors,setErrors]= useState("")
    const [input,setInput] = useState({
        isActive: "",
        rol:""
    })

    function onChange(e){
        e.preventDefault()
    if(e.target.name === "isActive"){
        if(e.target.value === "true"){
            return(setInput({
                ...input,
                [e.target.name]: false
            }))
        }
        if(e.target.value === "false"){
            return(setInput({
                ...input,
                [e.target.name]: true
            }))
        }
    }
    if(e.target.name === "rol"){
        return(
            setInput({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
}
    
    async function onSubmit(event){
        event.preventDefault()
        setErrors(submitValidations(input))
        if(Object.keys(errors).length === 0
        && input.isActive !== ""
        && input.rol !== ""){
            let response = null
            try {
                response = await axios.put(`${SERVER}/user/status/${user.id}`,input)
                const result = response.data
                if(result){
                if(result.msg === "Status updated"){
                    toast.success(`${result.msg}`, {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                    dispatch(getAllUsers())
                    setInput({
                        isActive: "",
                        rol:""
                    })
                    setUserEdit([])

                }else{
                    toast.error(`${result.msg}`, {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                }
            }
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(()=>{
        if(user && user.id){
            setInput({
                isActive:user.isActive,
                rol: user.rol
            })
        }
    },[user])
    return(
        <div className={style.container}>

           {user && user.id ? 
           <>
           <button onClick={(e)=> setUserEdit([])} className={style.closeBtn}>X</button>
           <div className={style.imageBox}>
                <img id={style.imageDiv}src="https://res.cloudinary.com/drcvcbmwq/image/upload/v1653589673/aps_504x498_medium_transparent-pad_600x600_f8f8f8_r3fwnu.jpg" alt="..."/>
            </div>
            <div>
                <h2>{user.user_name}</h2>
                <h4>{user.email}</h4>

            </div>

        <form>
            <div className={style.containerForm}>
            <div className={style.section}>
            <span>Rol: {input && input.rol ? capitalize(input.rol) : "No rol"}</span>
            <button name= "rol" value={input.rol === "user"? "admin": "user"} onClick={onChange} className={style.btnX}>Change</button>
            </div>
            <div className={style.section}>
            <span>Status: {input.isActive === true ? "Active": "Inactive"}</span>
            <button name="isActive" value={input.isActive} onClick={onChange} className={style.btnX}>Change</button>
            </div>
            <br/>
            <input type="submit" value="Save" onClick={onSubmit} className={style.btnX}/>
            </div>
        </form>
           </>
           : 
           <>
            <div className={style.imageBox}>
                <img id={style.imageDiv}src="https://res.cloudinary.com/drcvcbmwq/image/upload/v1654009200/v2_hvt2md.jpg" alt="..."/>
            </div>
            <div className={style.titleF}>
            <h2>User admin page</h2>
            </div>
            <div className={style.dataBox}>
            <h2 id={style.special}><i>- Search an user</i></h2>
            <h2 id={style.special}><i>- Authorize an user</i></h2>
            <h2 id={style.special}><i>- Deactivate an account</i></h2>
            </div>
           </>} 
            
        </div>
        
    )
}