import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartProduct, deleteProductCart, getCart } from "../../redux/actions/products";
import Footer from "../Footer/Footer";
import NavBar from "../navBar/NavBar";

import style from './Cart.module.css'

export default function Cart(){
    
    const [input, setInput] = useState(1)
    const cart = useSelector((state) => state.products.cart)
    const dispatch =useDispatch();
    
    let total = 0;
    const user = JSON.parse(localStorage.getItem('userInfo'))

    useEffect(() => {
        dispatch(getCart(user.id))
        //console.log('dentra')
    }, [dispatch, user.id])

    function hanleDelete (e, productId){
        e.preventDefault()
        dispatch(deleteProductCart(user.id, productId))
        window.location.reload()
        console.log(user.id, productId)
    }

    function handleQty (e, productId){
        e.preventDefault()
        //console.log(e.target.value)
        setInput(e.target.value)
        dispatch(addCartProduct({
            userId: user.id,
            productId: productId, 
            required_quantity: e.target.value
            }
        ))
    }

    async function acount ()  {
        await cart.details?.map(p => {
            return (
                total = total + p.price_total
            )
        })
    } 
    acount()
    

    return (
        <div>
            <NavBar/>
            <div className={style.cart_container}>
                <div className={style.cart}>
                    <div className={style.cart_title}>
                        <h1>Cart</h1>
                    </div>
                    {
                        cart &&
                            cart.details?.map(p => {
                                return(
                                        <div className={style.cart_products}>
                                            <img src={p.img} style={{width: "330px", height: "200px"}} alt=''/>
                                            <span>$ {p.price}</span>
                                            <span>{p.name}</span>
                                            <div className={style.cart_amount}>
                                                <span>Qty: {`(${p.stock} max)`} </span>
                                                <input 
                                                    type='number'
                                                    name="Qty"
                                                    min={0}
                                                    max={p.stock}
                                                    onChange = {(e) => handleQty(e, p.productId)}
                                                />
                                            </div>
                                            <button className={style.btnDelete} onClick={e => hanleDelete(e, p.productId)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                </svg>
                                                Delete
                                            </button>
                                        </div>
                                )
                            }) 
                        }
                </div>
                <div className={style.cart_actions}>
                    <button className={style.btnDelete}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                        Delete All
                    </button>
                    <span>Total: ${total} </span>
                    <button className={style.btnPurchase}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16">
                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                        </svg>
                        Checkout 
                    </button>
                </div>
            </div>
            {/* <Footer/> */}
        </div>
        )
}