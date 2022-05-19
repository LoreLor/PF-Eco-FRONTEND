import React,{ useState } from "react"
import { useDispatch } from "react-redux"
import { getSingleUser } from "../../../../redux/actions/user"
import Banner from "../../Banner"

export default function UserSB ({users,userName,user,setUserName,setUser,setModalA}){
    const dispatch = useDispatch()
    const [isOpen,setIsOpen] = useState(false)
    
    function handleSearch (e){
        e.preventDefault()
        setUserName(e.target.value)
    }

    function editUser(e){
        if(e.target.name === "edit"){
            setIsOpen(state => !state);
        }
    }
    function cancelAction(e){
        e.preventDefault()
        setUser("")
    }

    function handleSubmit (e){
        e.preventDefault()
        var result= users.filter((element)=>element.user_name.toLowerCase() === userName.toLowerCase())
        setUser(result?.length ? result : "Not found")
        setUserName("")
    }
    function confirmEdit(e){
        if(e.target.name ==="edit"){
            setIsOpen(false)
            setModalA(true)
            dispatch(getSingleUser(user[0].id))
        }
    }
    return(
        <div>
                <form onSubmit={handleSubmit}>
                    <input type="search" value={userName} onChange={handleSearch} placeholder="Search by name..."/>
                    <button type='submit' onClick={handleSubmit}>Search</button>
                </form>
                <div>
            {user && Array.isArray(user)? <div>
                <span>{user[0].user_name}</span>
                <button name="edit" onClick={editUser}>Edit</button>
                <button name= "cancel" onClick={cancelAction}>X</button>
                <Banner setIsOpen={setIsOpen} isOpen={isOpen}>
                    <h2>Are you sure you want to edit "{user[0].name}"?</h2>
                    <button name="edit" onClick={confirmEdit}>Edit</button>
                </Banner>
            </div>: <></>}
            {user && typeof(user) === "string" ? <p>User not found</p>:<></>}
        </div>
        </div>
    )
}