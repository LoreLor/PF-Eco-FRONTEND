import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"


export default function PrivateUser({children}){
    const user = useSelector((state)=>state.users.userInfo)
    //const user = JSON.parse(localStorage.getItem('userInfo'))
    //const userObj= JSON.parse(localStorage.getItem('userGoog'))
    return Object.keys(user).length > 0  ? <Navigate to="/"/> : children
}