import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams, useNavigate } from "react-router-dom"
import { Rating } from "@mui/material";
import { toast } from 'react-toastify';
import numberFormat from "./numberFormat";

import { getCategories } from "../../redux/actions/categories";

import { addCartProduct, addCartProductGuest, cleanProducts, cleanReview, getCart, getProductById, getReviewsProduct, limpiarDetail } from "../../redux/actions/products";

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
   
    const user = useSelector((state)=>state.users.userInfo)

    useEffect(() => {
        dispatch(getProductById(id))
        .then( () => {
            dispatch(getCategories())
        })
        .then(() => {
            dispatch(getReviewsProduct(id))
        })
        return () => {
            dispatch(limpiarDetail()) 
            dispatch(cleanReview()) 
        }
    }, [id, dispatch])


    function handleBuy(e, productId) {
        e.preventDefault();
        if(user && user.id){
            dispatch(addCartProduct({
                userId: user.id,
                productId: productId,
                bundle: 1
            }))
            toast.success("Product added to cart!", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            navigate('/cart')
            dispatch(getCart(user.id))
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
                                <h4>${numberFormat(detailProduct.price)}</h4>
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
            <div className={style.review_container}>
                {
                    Array.isArray(reviewsProduct) ? 
                    <div className={style.box}>
                    {
                        reviewsProduct.map(r => {
                            return (
                                <div key={r.id} className={style.review}>
                                    <p>User:  {r.autor}</p>
                                    <Rating readOnly value={r.points}/>
                                    <p>{r.title}</p>
                                    <span className={style.review_description}>{r.description}</span> 
                                    <br></br>
                                </div>
                            )
                        })
                    }</div>: 
                    <div></div>
                }
            </div>
            <Footer/>
        </div>
    )
}