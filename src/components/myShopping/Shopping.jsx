import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../navBar/NavBar";
import { getShopping } from "../../redux/actions/products";
import Review from "../review/Review";
import style from './myShopping.module.css'
import Swal from "sweetalert2";

export default function Shopping() {
    const dispatch = useDispatch();
    const shopping = useSelector((state) => state.products.shopping)
    const user = useSelector((state) => state.users)


    useEffect(() => {
        dispatch(getShopping(user.userInfo.id))
    }, [user.userInfo.id, dispatch])

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
                                    <div>
                                        <Review id={d.id}>
                                        </Review>
                                        <br></br>
                                        <br></br>
                                    </div>
                                </div>
                            )
                        })
                    )
                })}

            </div>
        </div>
    )
} 