import React from "react";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import style from './ProductCard.module.css'

export default function ProductCard({name, img, price, rating, id}){


    return(
        <div className={style.container}>
            <div className={style.card}>
            <Link to={`/home/${id}`}>
                <img src={img[0]} alt="" className={style.card_img}/> 
            </Link>
                     <div className={style.card_data}>
                         <h1 className={style.card_title}>{name}</h1>
                         <span className={style.card_preci}>${price}</span>
                         <div className={style.card_ratBtn}>
                            <Rating name="read-only" value={rating} readOnly/>
                            <a href="#" className={style.card_button}>Buy Now</a>
                         </div>
                     </div>
            </div>
        </div>
    )
}