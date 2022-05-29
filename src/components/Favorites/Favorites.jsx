import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllFavs, deleteFav, getFavs } from "../../redux/actions/products";
import { NavLink } from "react-router-dom";
import Loader from "../Loading/Loader";
import NavBar from "../navBar/NavBar";
import Footer from "../Footer/Footer"
import style from "./Favorites.module.css"

export default function Favorites(){

    const dispatch = useDispatch()

    const favs = useSelector((state) => state.products.favs)
    const user = useSelector((state)=>state.users.userInfo)

    useEffect(() => {
        dispatch(getFavs(user.id))
    },[dispatch])

    function handleDeleteALL(e, userId){
        e.preventDefault();
        dispatch(deleteAllFavs(userId))
        .then(r => {
            dispatch(getFavs(user.id))
        })
    }

    function handleDelete(e, id){
        e.preventDefault();
        dispatch(deleteFav(user.id, id))
        .then(r => {
            dispatch(getFavs(user.id))
        })
    }

    return(
        <div>
            <NavBar/>
            <div className={style.favs_container}>
                <div className={style.favs}>
                    <div className={style.favs_title}>
                        <h1>Favs</h1>
                    </div>
                    <div className={style.favs_grid}>
                    {
                        user && user.id ?
                        favs?
                        favs.length !== 0?
                        favs?.map(f => {
                            return(
                                <div className={style.fav_card} key={f.id}>
                                                <div className={style.fav_img}>
                                                    <img src={f.img[0]} alt="" />
                                                </div>
                                                <span>{f.name}</span>
                                                <button className={style.btnDeleteFav} onClick={e=> handleDelete(e, f.id)}>X</button>
                                            </div>
                                        )
                                    }):
                                    <div className={style.noCart}>
                                        <h2>No products in Favorites</h2>
                                        <NavLink to={'/'} className={style.goHome}>Go to Home for add products</NavLink>
                                    </div> 
                            :
                            <Loader/>
                            :
                            <h1>login</h1>
                        }
                    </div>
                </div>
                <div className={style.favs_actions}>
                    <button className={style.btnDelete} onClick={e=>handleDeleteALL(e, user.id)} disabled={!favs?.length}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                        Delete All
                    </button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}