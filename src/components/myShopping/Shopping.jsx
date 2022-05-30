import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../navBar/NavBar";
import { getReviewsProductDetail, getShopping } from "../../redux/actions/products";
import style from './myShopping.module.css'
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer"
import numberFormat from "../detalleProducto/numberFormat";


export default function Shopping() {
    const dispatch = useDispatch();
    const shopping = useSelector((state) => state.products.shopping)
    const user = useSelector((state) => state.users.userInfo)
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(getShopping(user.id))
    }, [user.id, dispatch])

    function handleClick(e, id) {
        e.preventDefault()
        dispatch(getReviewsProductDetail(id))
        navigate("/review")
    }

    return (
        <div>
            <NavBar />
            <div className={style.shop_container}>
                <div className={style.shop}>
                    <div className={style.shopping_title}>
                        <h1>MyShopping</h1>
                    </div>
                    {
                        shopping &&
                            shopping.length !== 0 ?
                                shopping?.map((s, i) => {
                                    return (
                                        <div key={s.id} className={style.shop_products}>
                                            <div className={style.shop_date}>
                                                <h3>{i + 1} Buy on  {s.date.replace("T", " ").replace("Z", " ")}</h3>
                                            </div>
                                            <div className={style.shops}>
                                                {
                                                    s.details?.map(d => {
                                                        return (
                                                            <div className={style.products} key={d.id}>
                                                                <div className={style.shop_img}>
                                                                    <NavLink className={style.link} to={`/home/${d.productId}`}>
                                                                        <img src={d.img} alt="" className={style.imgBox} />
                                                                    </NavLink>
                                                                </div>
                                                                <span>{d.name}</span>
                                                                <span>Quantity: {d.bundle}</span>
                                                                <span>    price: ${d.price}</span>
                                                                {!d.hasReview ?
                                                                    <button onClick={e => handleClick(e, d.id)} className={style.btnReview}>ADD REVIEW</button>
                                                                    :
                                                                    <div><span>Reviewed</span></div>}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className={style.shop_total}>
                                                <span>Price total: $ {numberFormat(s.price_total)}</span>
                                            </div>
                                    </div>
                                )
                            })
                            :
                            <div className={style.noCart}>
                                <h2>No products purchased</h2>
                                <NavLink to={'/'} className={style.goHome}>Go to Home for buy products</NavLink>
                            </div>
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
} 