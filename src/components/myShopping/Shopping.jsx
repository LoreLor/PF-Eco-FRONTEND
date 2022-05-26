import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../navBar/NavBar";
import { cleanReview, getReviewsProductDetail, getShopping } from "../../redux/actions/products";
import style from './myShopping.module.css'
import { NavLink, useNavigate } from "react-router-dom";


export default function Shopping() {
    const dispatch = useDispatch();
    const shopping = useSelector((state) => state.products.shopping)
    const user = useSelector((state) => state.users)
    const review = useSelector((state) => state.products.review)
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(getShopping(user.userInfo.id))
    }, [user.userInfo.id, dispatch])

    function handleClick(e, id) {
        e.preventDefault()
        dispatch(getReviewsProductDetail(id))
        navigate("/review")
    }

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div className={style.container}>

                {shopping?.map(s => {
                    return (
                        s.details?.map(d => {
                            return (
                                <div className={style.reviewCard}>
                                    <h4>{d.name}</h4>
                                    {!d.hasReview ? 
                                    <button onClick={e => handleClick(e, d.id)}>ADD REVIEW</button> :
                                    <div></div> }
                                </div> 
                            )
                        })
                    )
                })}

            </div>
        </div>
    )
} 