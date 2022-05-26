import React, { useState } from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useParams, useNavigate } from "react-router-dom"
import { Rating } from "@mui/material";
import { toast } from 'react-toastify';

import { getCategories } from "../../redux/actions/categories";

import { addCartProduct, addCartProductGuest, cleanReview, getProductById, getReviewsProduct, limpiarDetail } from "../../redux/actions/products";

import style from './ProductDetail.module.css'

import Loader from "../Loading/Loader";
import NavBar from "../navBar/NavBar";
import Carrousel from "../Carrousel/Carrousel"
import Footer from "../Footer/Footer";
export default function ProductDetail() {

    let { id } = useParams()
    
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const detailProduct = useSelector((state) => state.products.detail)
    const categories = useSelector((state) => state.products.categoriesDb)
    const reviewsProduct = useSelector((state) => state.products.reviews)
    //console.log(detailProduct)
    const user = JSON.parse(localStorage.getItem('userInfo'))

    useEffect(() => {
        dispatch(getProductById(id))
        dispatch(getCategories())
        dispatch(getReviewsProduct(id))
        return () => {
            dispatch(limpiarDetail()) 
            dispatch(cleanReview()) 
        }
    }, [id, dispatch])


    function handleBuy(e, productId) {
        e.preventDefault();
        if(user){
            dispatch(addCartProduct({
                userId: user.id,
                productId: productId,
                required_quantity: 1
            }))
            toast.success("Product added to cart!", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            navigate('/cart')
        }else{
            dispatch(addCartProductGuest(productId))
            toast.success("Product added to cart!", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            navigate('/cart')
        }
    }


    const stockItems = []
    for (var i = 1; i <= detailProduct.stock; i++) {
        stockItems.push(i)
    }
    //console.log(stockItems)

    return (
        <div>
            <NavBar categories={categories} />
            <div className={style.card_container}>
                {
                    detailProduct.rating >= 0 ?
                        <div className={style.card}>
                            <div className={style.card_img}>
                                <Carrousel img={detailProduct.img}/>
                            </div>
                            <div className={style.card_data}>
                                <NavLink to={"/"}>
                                    <button className={style.btnBack}>X</button>
                                </NavLink>
                                {detailProduct.categories?.map(c => {
                                    return (
                                        <span key={c.name}>{c.name}</span>
                                    )
                                })}
                                <h3>{detailProduct.name}</h3>
                                <h4>${detailProduct.price}</h4>
                                <Rating readOnly value={detailProduct.rating} />
                                <div className={style.desc}>
                                    <p>{detailProduct.description}</p>
                                </div>
                                {
                                    detailProduct.stock === 0 ?
                                        <div>
                                            <h2>Product out of stock</h2>
                                        </div>
                                        :
                                        <div className={style.card_dataBtm}>
                                            <h5>{detailProduct.stock} Available!</h5>
                                        </div>
                                }
                                <button onClick={e => handleBuy(e, detailProduct.id)} className={style.myBtn} disabled={detailProduct.stock === 0}>Buy Now</button>
                            </div>
                        </div> :
                        <Loader />
                }
            </div>
            <div>
                {
                    Array.isArray(reviewsProduct) ? <div>{
                        reviewsProduct.map(r => {
                            return (
                                <div>
                                    <p>{r.autor}</p>
                                    <p>{r.points}</p>
                                    <p>{r.title}</p>
                                    <p>{r.description}</p> 
                                    <br></br>
                                </div>
                            )
                        })
                        }</div> : <div> </div>
                }
            </div>
            <Footer/>
        </div>
    )
}