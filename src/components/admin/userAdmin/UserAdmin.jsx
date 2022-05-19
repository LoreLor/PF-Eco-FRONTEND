import React,{useEffect,useState} from "react"
import {useSelector,useDispatch} from "react-redux"
import Banner from "../Banner"
import axios from "axios"
import submitValidators from "./validators/submitValidations"
import { getAllUsers } from "../../../redux/actions/user"

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
        return(
            setInput({
            ...input,
            [e.target.name]: e.target.value
        }))
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
                response = await axios.put(`http://localhost:3001/user/status/${userData.id}`,input)
                const result = response.data
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
        <>
        <form>
            <span>User rol: {input.rol}</span>
            <button name= "rol" value={input.rol === "User"? "Admin": "User"} onClick={onChange}>Change</button>
            <span>User status: {input.isActive}</span>
            <button name="isActive" value={input.isActive === "Active"? "Inactive": "Active"} onClick={onChange}>Change</button>
            <br/>
            <input type="submit" value="Edit" onClick={onSubmit}/>
        </form>
        <Banner isOpen={isOpen} setIsOpen={setIsOpen} closePrev={setModalA} resetData={setUser}>
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
                </Banner>
        </>
        
    )
}