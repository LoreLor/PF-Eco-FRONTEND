import React from "react";
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Link, NavLink, useParams } from "react-router-dom"
import { Rating } from "@mui/material";

import { getCategories } from "../../redux/actions/categories";

import { getProductById, limpiarDetail } from "../../redux/actions/products";

import style from './ProductDetail.module.css'

import Loader from "../Loading/Loader";
import NavBar from "../navBar/NavBar";

export default function ProductDetail (){
    
    let {id} = useParams()
    
    const dispatch = useDispatch();
    const detailProduct = useSelector((state) => state.products.detail)
    const categories = useSelector((state) => state.products.categoriesDb)
    const loading = useSelector((state) => state.products.loading)
    
    useEffect(() => {
        dispatch(getProductById(id))
        dispatch(getCategories())
        return ()=>{dispatch(limpiarDetail())}
    },[id, dispatch])

    function handleSelectQty (e){
        e.preventDefault();
        console.log(`seleccionaste ${e.target.value} items`)
    }

    function handleBuy(e){
        e.preventDefault();
        alert('compraste wachin')
    }


    const stockItems = []
    for(var i = 1; i <= detailProduct.stock; i++ ){
        stockItems.push(i)
    }
    //console.log(stockItems)

    return(
        <div>
            <NavBar categories={categories}/>
            {
                detailProduct ?
                    <div className={style.card}>
                        <div className={style.card_img}>
                            <div className={style.imgContainer}>
                                <img src={detailProduct.img} alt= 'img product'/>
                            </div>
                        </div>
                        <div className={style.card_data}>
                            <NavLink to={"/home"}>
                                <button className={style.btnBack}>X</button>
                            </NavLink>
                            {detailProduct.categories?.map(c => {
                                return(
                                    <span key={c.name}>{c.name}</span>
                                )
                            })}
                            <h3>{detailProduct.name}</h3>
                            <h4>${detailProduct.price}</h4>
                            <Rating readOnly value={detailProduct.rating}/>
                            <div className={style.desc}>
                                <p>{detailProduct.description}</p>
                            </div>
                            <div className={style.card_dataBtm}>
                                <div className={style.qty}>
                                    <h5>Choise Qty:</h5>
                                    <select className={style.select} onChange={e => handleSelectQty(e)}>
                                        {
                                            stockItems.map(i => {
                                                return(
                                                    <option key={i} value={i}>{i}</option>
                                                    )
                                                })  
                                            }
                                    </select>
                                </div>
                                <h5>{detailProduct.stock} Available!</h5>
                            </div>
                            <button onClick={e => handleBuy(e)} className={style.myBtn}>Buy Now</button>
                        </div>
                    </div>:
                    <Loader/>
            }
        </div>
    )
}