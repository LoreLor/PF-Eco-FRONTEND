import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../navBar/NavBar";
import { getReviewsProductDetail, getShopping } from "../../redux/actions/products";
import style from './myShopping.module.css'
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer"


export default function Shopping() {
    const dispatch = useDispatch();
    const shopping = useSelector((state) => state.products.shopping)
    const user = useSelector((state) => state.users)
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

                {!shopping ?
                    <div>
                        {shopping?.map((s, i) => {
                            return (
                                <div key={s.id}>
                                    <h3>Compra {i}</h3>
                                    {
                                        s.details?.map(d => {
                                            return (
                                                <div className={style.reviewCard} key={d.id}>
                                                    <h4>{d.name}</h4>
                                                    {!d.hasReview ?
                                                        <button onClick={e => handleClick(e, d.id)}>ADD REVIEW</button> :
                                                        <div></div>}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })}
                    </div> :
                    <div className={style.noCart}>
                        <h2>No products purchased</h2>
                        <NavLink to={'/'} className={style.goHome}>Go to Home for buy products</NavLink>
                    </div>
                }


            </div>
            <Footer />
        </div>
    )
} 