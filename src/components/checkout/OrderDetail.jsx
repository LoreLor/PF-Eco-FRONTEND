import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getCart } from "../../redux/actions/products";
import { getSingleUser } from "../../redux/actions/user";
import s from "./OrderDetail.module.css";

    function OrderDetail() {
        const user = useSelector((state) => state.users.userInfo);
        const cart = useSelector((state) => state.products.cart);
        const [sdkReady, setSdkReady] = useState(false);

        useEffect(() => {
            getSingleUser(user.id);
            getCart(user.id);
        }, [user]);

        useEffect(() => {
            const addPayPalScript = async () => {
                const { data } = await axios.get('/api/config/paypal');
                const script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
                script.async = true;
                script.onload = () => {
                setSdkReady(true);
                };
                document.body.appendChild(script);
            };
            addPayPalScript();
        })

        const handlePayPal = ()=>{
            
        }


  return (
        <div>
            <div className={s.contenedor}>
                <div class="container">
                    <div class="py-5 text-center">
                        <h2 className={s.title}>
                        Your Order{" "}
                    <div>
                    <NavLink to="/" className={s.titulo}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        fill="currentColor"
                        className="bi bi-phone"
                        viewBox="0 0 16 16"
                    >
                        <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />
                        <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                    </svg>
                    City Cell
                    </NavLink>
                </div>
                </h2>
            </div>

            <div class="row">
                <div class="col-md-6 order-md-2 mb-4">
                <h4 class="d-flex justify-content-between align-items-center mb-3">
                    <div className={s.subtitulo}>
                    <p>Purchase Order N°{" "}</p>
                    <span>{cart.id}</span>
                    </div>
                    <span class="badge badge-secondary badge-pill"></span>
                </h4>
                <ul class="list-group mb-3">
                    {cart
                    ? cart.details.map((p) => {
                        return (
                            <li class="list-group-item d-flex justify-content-between lh-condensed">
                            <>
                                <div key={p.id}>
                                <h6 class="my-0">Your Products</h6>
                                <h6 class="my-0">Product name: {p.name}</h6>
                                <img src={p.img} className={s.small} alt=""></img>
                                <small class="text-muted">
                                    Brief description: {p.description}
                                </small>
                                <hr />
                                </div>
                                <span class="text-muted">Qty:{p.bundle}</span>
                                <span class="text-muted">Price:{p.price}</span>
                            </>
                            </li>
                        );
                        })
                    : null}
                    <li class="list-group-item d-flex justify-content-between bg-light">
                    <div class="text-success">
                        <h6 class="my-0">Shipping Address</h6>
                        <li class="list-group-item d-flex justify-content-between">
                        <strong>FullName: </strong>
                        {user.name} {user.last_name}
                        <br />
                        <strong>Address: </strong>
                        {user.address}
                        <br />
                        </li>
                        <h6 class="my-0">Payment Method</h6>
                        <li class="list-group-item d-flex justify-content-between">
                        <strong>{user.payment_method} </strong>
                        </li>
                    </div>
                    </li>
                </ul>
                </div>
                <button
                    amount={cart.price_total}
                    onSuccess={handlePayPal}>
                </button>
            </div>
            </div>
        </div>
        </div>
  );
}

export default OrderDetail;
