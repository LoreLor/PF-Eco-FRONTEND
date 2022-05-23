import React,{useEffect,useState} from "react"
import {useSelector,useDispatch} from "react-redux"
import FlashModal from '../AdminModals/FlashModal'
import axios from "axios"
import submitValidators from "./validators/submitValidations"
import { getAllUsers } from "../../../redux/actions/user"
import capitalize from '../adminPage/Capitalize'
import style from './UserAdmin.module.css'
import SERVER from "../../../server"

export default function UserAdmin({user,setModalA,setUser}){
    const dispatch = useDispatch()
    const userData = useSelector((state)=>state.users.userEdit)
 
    const [errors,setErrors]= useState("")
    const [input,setInput] = useState({
        isActive: "",
        rol:""
    })
    
    const [keyword,setKeyword]= useState("")
    const [isOpen,setIsOpen] =useState(false)

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
    
    function onClose(e){
        e.preventDefault()
        setIsOpen(false)
        setModalA(false)
        setUser("")
    }

    async function onSubmit(event){
        event.preventDefault()
        setErrors(submitValidators(input))
        if(Object.keys(errors).length === 0
        && input.isActive !== ""
        && input.rol !== ""){
            let response = null
            try {
                response = await axios.put(`${SERVER}/user/status/${userData.id}`,input)
                const result = response.data
                console.log(result)
                setKeyword(result.msg)
                if(!isOpen && result){
                    setIsOpen(state => !state);
                }
                if(result.msg === "Status updated"){
                    dispatch(getAllUsers())
                    setInput({
                        isActive: "",
                        rol:""
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(()=>{
        if(user && userData){
            setInput({
                isActive:userData.isActive,
                rol: userData.rol
            })
        }
    },[user,userData])
    return(
        <div className={style.container}>

        <form>
            <div className={style.containerForm}>
            {input.rol ? <span>User rol: {capitalize(input.rol)}</span>: <></>}
            <button name= "rol" value={input.rol === "user"? "admin": "user"} onClick={onChange} className={style.btnAdmin}>Change</button>
            <span>User status: {input.isActive === true ? "Active": "Inactive"}</span>
            <button name="isActive" value={input.isActive} onClick={onChange} className={style.btnAdmin}>Change</button>
            <br/>
            <input type="submit" value="Edit" onClick={onSubmit} className={style.btnAdmin}/>
            </div>
        </form>

        <FlashModal isOpen={isOpen} setIsOpen={setIsOpen} closePrev={setModalA} resetData={setUser}>
                    { keyword.length ? (
                        <>
                        <h2>{keyword}</h2>
                        {keyword === "Status updated" ? 
                            <>
                            <button onClick={onClose}> 
                                Close All
                            </button>
                            </>
                        : 
                            <>
                            <button onClick={()=> setIsOpen(false)}>Try Again</button>
                            </>
                        
                    }
                        </>
                    ):(
                        <h2>Invalid Data</h2>
                    )}
                </FlashModal>
        </div>
        
    )
}