import NavBarAdmin from "../adminPage/navBarAdmin/NavBarAdmin";
import UsersTable from "./UsersTable";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../adminPage/searchBar/SearchBar";
import style from './Table_Main.module.css'
import EditUser from "./EditUser";
import { getAllUsers } from "../../../redux/actions/user";
import Footer from "../../Footer/Footer";


export default function MainPage(){
    const users = useSelector((state)=>state.users.users)
    const user = useSelector((state)=>state.users.userInfo)

    const dispatch = useDispatch()

    const [result,setResult] = useState("")
    const [userEdit,setUserEdit] = useState([])

    const searchResult = result ? users.filter((user)=> user.user_name.toLowerCase().includes(result.toLowerCase())) : ""
    const array = !result ? users : searchResult


    useEffect(()=>{
        dispatch(getAllUsers())
    },[dispatch])
    return (
        <div>
            <NavBarAdmin/>
            <div className={style.caja}>
                <div className={style.content}>
                    <div className={style.searchBar}>
                    <SearchBar result={result} setResult={setResult} placeholder={"Search by name..."}/>
                    <EditUser user={userEdit[0]} setUserEdit={setUserEdit}/>
                    </div>
                    <div className={style.usersList}>
                    <UsersTable array={array} setUserEdit={setUserEdit} myUser={user}/>
                    </div>
                </div>
            </div>
            <br></br>
            <Footer/>
        </div>
    )

}