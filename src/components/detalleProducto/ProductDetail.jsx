import React from "react";
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Link, useParams } from "react-router-dom"
import { Rating } from "@mui/material";

import { getCategories } from "../../redux/actions/categories";

import { getProductById } from "../../redux/actions/products";

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
    },[id, dispatch])

    function handleSelectQty (e){
        e.preventDefault();
        console.log(`seleccionaste ${e.target.value} items`)
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
                            {detailProduct.categories?.map(c => {
                                return(
                                    <span key={c.name}>{c.name}</span>
                                )
                            })}
                            <h3>{detailProduct.name}</h3>
                            <h4>${detailProduct.price}</h4>
                            <Rating readOnly value={3}/>
                            <div className={style.desc}>
                                <p>{detailProduct.description}</p>
                            </div>
                            <div className={style.card_dataBtm}>
                                <h5>Choise Qty:</h5>
                                <select onChange={e => handleSelectQty(e)}>
                                    {
                                        stockItems.map(i => {
                                            return(
                                                <option key={i} value={i}>{i}</option>
                                                )
                                            })  
                                        }
                                </select>
                                <h5>{detailProduct.stock} Available!</h5>
                            </div>
                            <button>Buy Now</button>
                        </div>
                    </div>:
                    <Loader/>
            }
        </div>
    )
}