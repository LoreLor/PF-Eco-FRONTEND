import React, { useEffect } from "react";
import SearchBar from "../searchBar/SearchBar";
import Categories from "../categorias/Categories";
import OrderPrice from "../order/Order";
import { logout } from '../../redux/actions/user'
import style from './NavBar.module.css'
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FilterPrice from "../filterPrice/FilterPrice";
import SERVER2 from "../../server2";
import { getAllProducts, getCart, getCartGuest } from "../../redux/actions/products";
import Badge from '@mui/material/Badge';


export default function NavBar({ categories, paginado }) {
    const user = useSelector((state)=>state.users.userInfo)
    const dispatch = useDispatch();

    const cartUser = useSelector((state) => state.products.cart)
    const cartGuest = useSelector((state) => state.products.cartGuest) 
    const cart = user && user.id? cartUser.details : cartGuest
    const qty = cart && [].concat(cart).reduce((a, c) => a + c.bundle, 0)

    useEffect(()=>{
        dispatch(getCart(cartUser.id))

    },[])

    function handleLogout() {
        dispatch(logout())
        window.location.reload();
    }
    
    function handleClick(e) {
        e.preventDefault();
        dispatch(getAllProducts())
        .then( () => {
            window.location.reload();
        })
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg">
                <div class="container-fluid">
                    <NavLink to="/" className={style.title}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-phone" viewBox="0 0 16 16">
                            <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />
                            <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                        </svg>
                        City Cell
                    </NavLink>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navBar" aria-controls="navBar" aria-expanded="false" aria-label="Toggle navigation">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#F66B0E" class="bi bi-three-dots" viewBox="0 0 16 16">
                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                        </svg>
                    </button>
                    <div class="collapse navbar-collapse" id="navBar">
                        <form class="d-flex" role="search" style={{width:'100%', justifyContent:'center', marginRight:'200px'}}>
                            <SearchBar />
                        </form>
                    </div>
                </div>
            </nav>
            <div className={style.footHead}>
                {
                    window.location.href.includes(`${SERVER2}/profile`) ||
                    window.location.href.includes(`${SERVER2}/favs`) || 
                    window.location.href.includes(`${SERVER2}/home`) || 
                    window.location.href.includes(`${SERVER2}/cart`) || 
                    window.location.href.includes(`${SERVER2}/myShopping`) || 
                    window.location.href.includes(`${SERVER2}/review`) 
                        ? 
                        <NavLink to="/" className={style.mybtn}></NavLink> 
                        :
                        <div className={style.aux}>
                            <Categories categories={categories} paginado= {paginado}/>
                            <OrderPrice />
                            <FilterPrice />
                            <button onClick={e => handleClick(e)} className={style.mybtn}>Clear filters</button>
                        </div>
                }
                <div className={style.logCart}>
                    <div className={style.conte}>
                    {
                        Object.keys(user).length > 0 ?     
                                <div className={style.drop}>
                                    <button className={style.perfil} type="button" data-toggle="dropdown">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#F66B0E" className="bi bi-person-circle" viewBox="0 0 16 16">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                        </svg>
                                        <h3 className={style.userName}>{user.user_name}</h3>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <button className={style.mybtn} onClick={handleLogout}>Log Out</button>
                                        </li>
                                        {!window.location.href.includes("/myShopping") ?
                                            <li>
                                                <NavLink to="/myShopping">
                                                    <button className={style.mybtn} /* onClick={} */>My shopping</button>
                                                </NavLink>
                                            </li> : <li></li>
                                        }
                                        {!window.location.href.includes("/favs") ?
                                            <li>
                                                <NavLink to="/favs">
                                                    <button className={style.mybtn} /* onClick={} */>Favorites</button>
                                                </NavLink>
                                            </li> : <li></li>
                                        }
                                        {!window.location.href.includes("/profile") ?
                                            <li>
                                                <NavLink to="/profile">
                                                    <button className={style.mybtn} /* onClick={} */>Profile</button>
                                                </NavLink>
                                            </li> : <li></li>
                                        }
                                        {user && user.rol === "admin" && !window.location.href.includes("/admin") ?
                                            <li>
                                                <NavLink to="/admin">
                                                    <button className={style.mybtn} /* onClick={} */>Admin</button>
                                                </NavLink>
                                            </li> : <li></li>}
                                    </ul>
                                </div>
                        : 
                            <NavLink to="/login" className={style.mybtn}>Log In</NavLink>
                    }        
                    </div>             
                    {/* {user && user.rol === "admin" ? <NavLink to="/admin" className={style.mybtn}>Admin</NavLink> : <></>} */}

                    <NavLink to="/cart">

                        <button className="btn btn-secundary" type="button" style={{ marginRight: '10px' }}>
                            <Badge badgeContent={qty}  color="secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#F66B0E" className="bi bi-cart-check" viewBox="0 0 16 16">
                                <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
                                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                            </svg>
                            </Badge>
                        </button>
                    </NavLink>
                </div>
            </div>
        </header>
    )
}