import { Navigate } from "react-router-dom"


export default function PrivateAdmin({children}){
    const user = JSON.parse(localStorage.getItem('userInfo'))
    //const userObj= JSON.parse(localStorage.getItem('userGoog'))
    return user // ? <Navigate to="/"/> : children
}