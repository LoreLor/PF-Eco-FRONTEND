import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"


export default function PrivateAdmin({children}){
    const user = useSelector((state)=>state.users.userInfo)
    return Object.keys(user).length > 0? user.rol === "admin"? children :<Navigate to="/"/>: <Navigate to="/login"/>
}

