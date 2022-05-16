import React from "react";
import SearchBar from "../searchBar/SearchBar";
import Categories from "../categorias/Categories";
import OrderPrice from "../orderPrice/OrderPrice";
import { logout } from '../../redux/actions/user'
import style from './NavBar.module.css'
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import FilterPrice from "../filterPrice/FilterPrice";
import { getAllProducts } from "../../redux/actions/products";


export default function NavBar({categories}){
    const user = JSON.parse(localStorage.getItem('userInfo'))
    const dispatch = useDispatch();
    const navigate = useNavigate()


    function handleCart(e){
        e.preventDefault()
        alert('carrito')
    }

    function handleLogout(){
        dispatch(logout())
    }

    function handleClick(e) {
        e.preventDefault();
        window.location.reload();
    }

    return(
        <header>
            <nav className="navbar navbar-expand-sm">
                <div className={style.container}>
                    <NavLink to="/" className="navbar-brand">Titulo del Ecommerce</NavLink>
                    <div className={style.box}>
                        <SearchBar/>
                        <div className={style.conte}>
                            {
                                user ? (
                                    <div className={style.drop}>
                                        <button className={style.perfil} type="button" data-toggle="dropdown">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#F66B0E" className="bi bi-person-circle" viewBox="0 0 16 16">
                                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
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
                        </div>
                    </div>
                </div>
            </nav>
                <div className={style.footHead}>
                    { window.location.href.includes("http://localhost:3000/home/") ? <NavLink to="/" className={style.mybtn}></NavLink> :
                    <div className={style.aux}>
                        <Categories categories={categories}/>
                        <OrderPrice />
                        <FilterPrice />
                        <button onClick={e => handleClick(e)} className={style.mybtn}>Refresh</button>
                        {/* <NavLink to="/" className={style.mybtn}>Help</NavLink> */}
                    </div>
                    }
                    <div>  
                        
                        <NavLink to="/admin" className={style.mybtn}>Admin</NavLink>
                        <button className="btn btn-secundary" type="button" style={{marginRight:'10px'}} onClick={e => handleCart(e)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#F66B0E" className="bi bi-cart-check" viewBox="0 0 16 16">
                                <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                            </svg>
                        </button>
                    </div>
                </div>
        </header>
    )
}