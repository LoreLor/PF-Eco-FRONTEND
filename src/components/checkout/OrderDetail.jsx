import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getCart } from "../../redux/actions/products";
import { getSingleUser } from "../../redux/actions/user";
import Footer from "../Footer/Footer";
import s from "./OrderDetail.module.css";
import PaypalCheckoutButton from "./PaypalCheckoutButton";

function OrderDetail() {
  const user = useSelector((state) => state.users.userInfo);
  const cart = useSelector((state) => state.products.cart);
  //const amount = cart.details.reduce((a, c) => a + c.bundle * c.price, 0);
  const total_amount = cart.price_total - 5;

  useEffect(() => {
    getSingleUser(user.id);
    getCart(user.id);
  }, [user]);

  return (
    <div>
      <div className={s.contenedor}>
        <div class="container">
          <div class="py-5 text-center">
            <h2 className={s.title}>
              Your Order{" "}
              <div>
           
                <NavLink to="/" className={s.titulo} type="text"  data-bs-toggle="tooltip" data-bs-placement="top" title="GO HOME">
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

          <div class="row justify-content-around">
            <div class="col-md-6 order-md-2 mb-4">
              <h4 class="d-flex justify-content-between align-items-center mb-3">
                <div className={s.subtitulo}></div>
                <span class="badge badge-secondary badge-pill"></span>
              </h4>
              <hr />

              <ul class="list-group mb-3 ">
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
                            <span class="text-muted">
                              Price:{p.price_total}
                            </span>
                          </>
                        </li>
                      );
                    })
                  : null}
                <li class="list-group-item d-flex justify-content-between bg-light">
                  <div class="text-success">
                    <h6 class="my-0">Shipping Address</h6>
                    <li class="list-group-item d-flex justify-content-between">
                      <div><strong>FullName: </strong>
                      {user.name} {user.last_name}  <br /></div>
                    <hr/>
                      <div><strong>Address: </strong>
                      {user.address} <br /></div>
                     <hr/>
                    </li>
                    <h6 class="my-0">Payment Method</h6>
                    <li class="list-group-item d-flex justify-content-between">
                      <strong>{user.payment_method} </strong>
                    </li>
                    <h6 class="my-0">Amount</h6>
                    <li class="list-group-item d-flex justify-content-center">
                      <span>
                        <strong>Amount:</strong> USD {total_amount}
                      </span>
                    </li>
                  </div>
                </li>
                <PaypalCheckoutButton className={s.btnPaypal} />
              </ul>
            </div>
          </div>
        </div>
      </div>
      <foot>
      <Footer/>
      </foot>
    </div>
  );
}

export default OrderDetail;