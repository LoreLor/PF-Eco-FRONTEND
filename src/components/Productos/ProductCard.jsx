import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import style from './ProductCard.module.css';
import { addCartProduct, getCart, addCartProductGuest, addFav, getFavs, deleteFav } from "../../redux/actions/products";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import numberFormat from "../detalleProducto/numberFormat";


export default function ProductCard({name, img, price, rating, id, isFaved}){
    
    const dispatch = useDispatch()
    const user = useSelector((state)=>state.users.userInfo)

    function handleAddCart(e,id){
        e.preventDefault()
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
        }else{
            dispatch(addCartProductGuest(id))
        }
        toast.success("Product added to cart!", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }
    
    function handleFavourites(e, productId){
        e.preventDefault()
        if(Object.keys(user).length > 0){
            if(isFaved){
                dispatch(deleteFav(user.id, productId))
                .then(r => {
                    dispatch(getFavs(user.id))
                })
                toast.error("Product removed to Favorites!!", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }else{
                dispatch(addFav(user.id, productId))
                .then(r => {
                    dispatch(getFavs(user.id))
                })
                toast.success("Product added to Favorites!!", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        }else{
            toast.error("Login for add Favorites!", {
                position: toast.POSITION.BOTTOM_RIGHT
              });
        }
    }

    const [
        color,
        span
    ] = isFaved 
        ? [
            'red',
            'Remove Favorites'
        ] : [
            'currentColor',
            'Add to Favorites'
        ]

    return(
            <div className={style.card}>
                <div className={style.card_img}>
                    <img src={img[0]} alt="" /> 
                    <ul className={style.card_icon}>
                        <li>
                            <span>{span}</span>
                            <button className={style.btnIcon} onClick={e=> handleFavourites(e, id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={color} className="bi bi-heart" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                </svg>
                            </button>
                        </li>
                        <li>
                            <span>View Details</span>
                            <Link to={`/home/${id}`}>
                                <button className={style.btnIcon}>                        
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                    </svg>
                                </button>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={style.card_data}>
                    <h1 className={style.card_title}>{name}</h1>
                    <span className={style.card_preci}>${numberFormat(price)}</span>
                    <div className={style.card_ratBtn}>
                        <Rating name="read-only" value={rating} readOnly/>
                        <Link href="#" className={style.card_button} onClick={(e) => handleAddCart(e,id)}>AddCart</Link>
                    </div>
                </div>
            </div>
    )
}