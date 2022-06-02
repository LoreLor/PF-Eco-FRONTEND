import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllFavs, deleteFav, getFavs, addCartProduct, getCart } from "../../redux/actions/products";
import { NavLink } from "react-router-dom";
import { toast } from 'react-toastify';
import Loader from "../Loading/Loader";
import NavBar from "../navBar/NavBar";
import Footer from "../Footer/Footer"
import style from "./Favorites.module.css"

export default function Favorites() {

    const dispatch = useDispatch()

    const favs = useSelector((state) => state.products.favs)
    const user = useSelector((state) => state.users.userInfo)

    useEffect(() => {
        dispatch(getFavs(user.id))
    }, [dispatch])

    function handleDeleteALL(e, userId) {
        e.preventDefault();
        dispatch(deleteAllFavs(userId))
            .then(r => {
                dispatch(getFavs(user.id))
            })
    }

    function handleDelete(e, id) {
        e.preventDefault();
        dispatch(deleteFav(user.id, id))
            .then(r => {
                dispatch(getFavs(user.id))
            })
    }

    function handleAdd(e, id){
        e.preventDefault();
        if(user && user.id){
            const addCart = {
                userId: user.id,
                productId: id,
                bundle: 1
            }
            dispatch(addCartProduct(addCart))
            .then(r=>{
                dispatch(getCart(user.id))
            })
            toast.success("Product added to cart!", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }

    return (
        <div>
            <NavBar />
            <div className={style.favs_container}>
                <div className={style.favs}>
                    <div className={style.favs_title}>
                        <h1>My Favourites</h1>
                    </div>
                    <div className={style.favs_grid}>
                        {
                            user && user.id ?
                                favs ?
                                    favs.length !== 0 ?
                                        favs?.map(f => {
                                            return (
                                                <div className={style.fav_card} key={f.id}>
                                                        <div className={style.fav_img}>
                                                            <NavLink to={`/home/${f.id}`}>
                                                                <img src={f.img[0]} alt="" />
                                                            </NavLink>
                                                        </div>
                                                        <span>{f.name}</span>
                                                        <div className={style.sale}>
                                                            <h3 className={style.desc}>25% off</h3>
                                                        </div>
                                                        <div className={style.ul_favs}>
                                                            <ul>
                                                                <li>
                                                                    <button className={style.btnDeleteFav} onClick={e => handleDelete(e, f.id)}>X</button>
                                                                </li>
                                                                <li>
                                                                    <button className={style.addCart} onClick={e => handleAdd(e, f.id)}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
                                                                            <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
                                                                            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                                                        </svg>
                                                                </button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                </div>
                                            )
                                        }) :
                                        <div className={style.noCart}>
                                            <h2>No products in Favorites</h2>
                                            <NavLink to={'/'} className={style.goHome}>Go to Home for add products</NavLink>
                                        </div>
                                    :
                                    <Loader />
                                :
                                <h1>login</h1>
                        }
                    </div>
                </div>
                <div className={style.favs_actions}>
                    <button className={style.btnDelete} onClick={e => handleDeleteALL(e, user.id)} disabled={!favs?.length}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                        </svg>
                        Delete All
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    )
}