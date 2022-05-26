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
                {/* <div className={style.shopping_title}>
                    <h1>MyShopping</h1>
                </div> */}
                

                {!shopping?.length ?
                    <div className={style.noCart}>
                        <h2>No products purchased</h2>
                        <NavLink to={'/'} className={style.goHome}>Go to Home for buy products</NavLink>
                    </div> :
                    <div>
                    {shopping?.map((s, i) => {
                        return (
                            <div key={s.id}>
                                <h3>BUY {i}</h3>
                                {
                                    s.details?.map(d => {
                                        return (
                                            <div className={style.reviewCard} key={d.id}>
                                                <h4>{d.name}</h4>
                                                <h4>Quantity: {d.bundle}</h4>
                                                <h4>Unit price: {d.price}</h4>
                                                <h4>{d.date}</h4>
                                                {!d.hasReview ?
                                                    <button onClick={e => handleClick(e, d.id)}>ADD REVIEW</button> :
                                                    <div></div>}
                                            </div>
                                        )
                                    })
                                }
                                <h3>Price total: {s.price_total}</h3>
                            </div>
                        )
                    })}
                </div>
                }


            </div>
            <Footer />
        </div>
    )
} 