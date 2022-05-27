import { Navigate } from "react-router-dom"


export default function PrivateAdmin({children}){
    const user = JSON.parse(localStorage.getItem('userInfo'))
    return user? user.rol === "admin"? children :<Navigate to="/"/>: <Navigate to="/login"/>
}

