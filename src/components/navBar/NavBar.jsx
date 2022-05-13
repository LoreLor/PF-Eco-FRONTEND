import React from "react";
import SearchBar from "../searchBar/SearchBar";
import Categories from "../categorias/Categories";

import style from './NavBar.module.css'
import { NavLink } from "react-router-dom";

export default function NavBar({categories}){
    const user = JSON.parse(localStorage.getItem('userInfo'))


    function handleCart(e){
        e.preventDefault()
        alert('carrito')
    }

    return(
        <header>
            <nav className="navbar navbar-expand-sm">
                <div className={style.container}>
                    <NavLink exact to="/" className="navbar-brand">Titulo del Ecommerce</NavLink>
                    <div className={style.box}>
                        <SearchBar/>
                    </div>
                </div>
            </nav>
                <div className={style.footHead}>
                    <div>
                        <Categories categories={categories}/>
                        <NavLink exact to="/" className={style.mybtn}>History</NavLink>
                        <NavLink exact to="/" className={style.mybtn}>Help</NavLink>
                    </div>
                    <div>
                        {user ? 
                            <h3>{user.user_name}</h3> :(
                            <NavLink exact to="/login" className={style.mybtn}>Log In</NavLink>)
                        }
                        <button className="btn btn-secundary" type="button" style={{marginRight:'10px'}} onClick={e => handleCart(e)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-cart-check" viewBox="0 0 16 16">
                                <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                            </svg>
                        </button>
                        <NavLink exact to="/admin" className={style.mybtn}>Admin</NavLink>
                    </div>
                </div>
        </header>
    )
}