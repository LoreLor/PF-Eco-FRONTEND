import React from "react";
import { logout } from '../../../../redux/actions/user'
import style from './NavBarAdmin.module.css'
import { NavLink } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";

export default function NavBarAdmin(){
    
    const user = useSelector((state)=>state.users.userInfo)
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
                                            <li>
                                                <NavLink to="/profile">
                                                    <button className={style.mybtn} /* onClick={} */>Profile</button>
                                                </NavLink>
                                            </li>
                                            {!window.location.href.includes("/admin/users") ?
                                            <li>
                                                <NavLink to="/admin/users">
                                                    <button className={style.mybtn} /* onClick={} */>Users</button>
                                                </NavLink>
                                            </li> : <li></li>
                                            }
                                            {!window.location.href.includes("/admin/categories") ?
                                            <li>
                                                <NavLink to="/admin/categories">
                                                    <button className={style.mybtn} /* onClick={} */>Brand</button>
                                                </NavLink>
                                            </li> : <li></li>
                                            }
                                            {!window.location.href.includes("/admin/products") ?
                                            <li>
                                                <NavLink to="/admin/products">
                                                    <button className={style.mybtn} /* onClick={} */>Products</button>
                                                </NavLink>
                                            </li> : <li></li>
                                            }
                                            {!window.location.href.includes("/admin/orders") ?
                                            <li>
                                                <NavLink to="/admin/orders">
                                                    <button className={style.mybtn} /* onClick={} */>Orders</button>
                                                </NavLink>
                                            </li> : <li></li>
                                            }
                                        </ul>
                                    </div>    
                                ) : (
                                    <NavLink to="/login" className={style.mybtn}>Log In</NavLink>
                                )}
                            <NavLink to="/" className={style.mybtn}>Home</NavLink>
                            {window.location.href.includes('/admin/') ?
                                <NavLink to="/admin">
                                <button className={style.mybtn} /* onClick={} */>DashBoard</button>
                            </NavLink> 
                                : null                          
                            }
                        </div>
                    </div>
                </div>
        </header>
    )
}