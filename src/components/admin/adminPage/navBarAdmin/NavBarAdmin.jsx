import React from "react";
import SearchBar from "../../../searchBar/SearchBar";
import { logout } from '../../../../redux/actions/user'
import style from './NavBarAdmin.module.css'
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function NavBarAdmin({categories}){
    
    const user = localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')): null
    const dispatch = useDispatch();

    function handleLogout(){
        dispatch(logout())
        window.location.reload();
    }

    return(
        <header>
            <nav className="navbar navbar-expand-sm">
                <div className={style.container}>
                    <NavLink to="/" className={style.title}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-phone" viewBox="0 0 16 16">
                            <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z"/>
                            <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                        </svg>
                        City Cell
                    </NavLink>
                    <div className={style.box}>
                        <SearchBar/>
                    </div>
                </div>
            </nav>
                <div className={style.footHead}>
                    <div className={style.logCart}> 
                        <div className={style.conte}>
                            {
                                user ? (
                                    <div className={style.drop}>
                                        <button className={style.perfil} type="button" data-toggle="dropdown">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#F66B0E" className="bi bi-person-circle" viewBox="0 0 16 16">
                                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                            </svg>
                                            <h3 className={style.userName}>{user.user_name}</h3>
                                        </button>
                                        <ul className="dropdown-menu">     
                                            <li>
                                                <button className={style.mybtn} onClick={handleLogout}>Log Out</button>
                                            </li>
                                            {/* <li><a href="/register" className={style.logout}>Register</a></li> */}
                                        </ul>
                                    </div>    
                                ) : (
                                    <NavLink to="/login" className={style.mybtn}>Log In</NavLink>
                                )}
                            <NavLink to="/" className={style.mybtn}>Home</NavLink>                            
                        </div>
                    </div>
                </div>
        </header>
    )
}