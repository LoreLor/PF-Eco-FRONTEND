import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { addCartProduct, deleteProductCart, getCart, deleteOneProduct, deleteAllProductCart, paidCartTemporal, deleteProductCartGuest, addCartProductGuest  } from "../../redux/actions/products";
// import { addCartProduct, deleteProductCart, getCart, deleteOneProduct, deleteAllProductCart, closeCart, deleteProductCartGuest, addCartProductGuest} from "../../redux/actions/products";
import Footer from "../Footer/Footer";
import NavBar from "../navBar/NavBar";
import style from './Cart.module.css'
import numberFormat from "../detalleProducto/numberFormat";

export default function Cart(){
    
    const cartUser = useSelector((state) => state.products.cart)
    const cartGuest = useSelector((state) => state.products.cartGuest)
    const dispatch =useDispatch();
    const navigate = useNavigate();
    
    let total = 0;
    const user = localStorage.getItem('userInfo')
         ? JSON.parse(localStorage.getItem('userInfo'))
         : null

    useEffect(() => {
        if(user){
            dispatch(getCart(user.id))
        }
    }, [dispatch])
    
    //si hay usur logueado cargo su carrito, si no, el de invitados
    const cart = user ? cartUser.details : cartGuest

    function handleDelete (e, productId){
        e.preventDefault()
//----borramos todos los productos iguales del carrito-----
        if(user){
            dispatch(deleteProductCart(user.id, productId))
            .then(r => {
                dispatch(getCart(user.id))
            })
        }else{
            dispatch(deleteProductCartGuest(productId))
        }
    }

    function handleDeleteALL(e, id){
        e.preventDefault()
        dispatch(deleteAllProductCart(id))
        .then(r => {
            dispatch(getCart(user.id))
        })
    }

    function handleAdd(e, productId, bundle, stock){
        e.preventDefault()
        if(user){
            if(bundle !== stock){
                dispatch(addCartProduct({
                    userId: user.id,
                    productId: productId,
                }))
                .then(r => {
                    dispatch(getCart(user.id))
                    acount()
                })
            }else{
                Swal.fire({
                    title: 'No more Stock',
                    text:`${stock} max`,
                    icon:'error',
                    confirmButtonText:'Ok'
                })
            }
        }
    }

    function handleSubtract(e, productId, bundle){
        e.preventDefault()
        if(user){
            if(bundle === 1){
                dispatch(deleteProductCart(user.id, productId))
                .then(r => {
                    dispatch(getCart(user.id))
                    acount()
                })
            }else{
                dispatch(deleteOneProduct(user.id, productId))
                .then(r => {
                    dispatch(getCart(user.id))
                    acount()
                })
            }
        }
    }

function handleCheckout(e){
        e.preventDefault()
    if (user.id && user.email?.length) {
        navigate('/check')
     

       } else {
            navigate('/register');
         }
        // if(cart.length === 0) {
        //     alert("Por favor, ingrese productos antes de realizar el CHECKOUT.")
        // } else {
        //     dispatch(paidCartTemporal(cartUser.id))
        //     Swal.fire({
        //         title: 'CheckOut',
        //         text:`$ ${total}`,
        //         icon:'success',
        //         confirmButtonText:'Ok'
        //     })
        // }
    }


    function acount ()  {
        cart?.map(p => {
            return (
                total += p.price_total
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
                            cart.length !== 0?
                                cart?.map(p => {
                                    return(
                                            <div className={style.cart_products} key={p.id}>
                                                <div className={style.cart_img}>
                                                    <img src={p.img} alt=''/>
                                                </div>
                                                <span>$ {numberFormat(p.price)}</span>
                                                <span>{p.name}</span>
                                                <div className={style.cart_amount}>
                                                    <span>Qty: {`(${p.stock} max)`} </span>
                                                    {
                                                        user ?
                                                        <div className={style.amount_input}>
                                                        <button onClick={e=>handleAdd(e, p.productId || p.id, p.bundle, p.stock)} className={style.btnAdd}>+</button>
                                                        <input 
                                                            type='number'
                                                            name="Qty"
                                                            min={0}
                                                            max={p.stock}
                                                            value={p.bundle}
                                                            readOnly
                                                            />
                                                        <button onClick={e=>handleSubtract(e, p.productId || p.id, p.bundle)} className={style.btnSubs}>-</button>
                                                    </div>
                                                        :
                                                        <span>Login for add more quantity</span>
                                                    }
                                                </div>
                                                <button className={style.btnDelete} onClick={e => handleDelete(e, p.productId || p.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                    </svg>
                                                    Delete
                                                </button>
                                            </div>
                                    )
                            }):
                            <div className={style.noCart}>
                                <h2>No products in cart</h2>
                                <NavLink to={'/'} className={style.goHome}>Go to Home for add products</NavLink>
                            </div> 
                        }
                </div>
                {
                    user ? 
                        <div className={style.cart_actions}>
                            <button className={style.btnDelete} onClick={e=>handleDeleteALL(e, cart.id)} disabled={!cart?.length}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                                Delete All
                            </button>
                            <span>Total: ${numberFormat(total)} </span>
                            <button className={style.btnPurchase} onClick={e=> handleCheckout(e)} disabled={!cart?.length}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16">
                                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                                </svg>
                                Checkout 
                            </button> 
                        </div>
                        :
                        <div className={style.cart_actions}>
                            <NavLink to={'/login'} className={style.goHome}>Go to Login for Checkout</NavLink>
                        </div>
                    }
            </div>
            <Footer/>
        </div>
        )
}