import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate} from "react-router-dom";
import activeValidations from "../registro/validators/activeValidations";
import submitValidations from "../registro/validators/submitValidations"
import {getSingleUser, userUpdate} from '../../redux/actions/user'
import { closeCart, getCart, paidCartTemporal } from "../../redux/actions/products";
import s from "./CheckoutSteps.module.css";
import Footer from "../Footer/Footer";
import numberFormat from "../detalleProducto/numberFormat";

function CheckoutSteps() {

  const navigate = useNavigate();
  const dispacth = useDispatch();
  const user = useSelector((state) => state.users.userInfo)
  const cart = useSelector((state) => state.products.cart)

  const toPrice = (num) => Number(num.toFixed(2)); //ejemplo 6.123 -'5.12' - 5.12
  const amount= toPrice(cart.details.reduce((a, c) => a + c.bundle * c.price, 0));
  const total_amount= (cart.price_total - 5)



  const [input, setInput] = useState({
    name: user.name,
    last_name: user.last_name,
    phone_number: user.phone_number,
    email: user.email,
    address: user.address,
    payment_method: ""
  })

  const [errors, setErrors] = useState({});



  useEffect(()=>{
    getSingleUser(user.id)
    getCart(user.id)
  }, [user])

  const handleChange = (e) =>{
    e.preventDefault();
    setErrors(
      activeValidations({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

 
  const handleSubmit =(e) => {
      e.preventDefault();
      dispacth(userUpdate(user.id, input))
      dispacth(getCart(user.id))

      navigate('/order')  

    } 

  return (
    <div>
    <div className={s.contenedor}>
      <div class="container">
        <div class="py-5 text-center">
          <h2 className={s.title}>
            Checkout{" "}
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
                <p>Your Cart</p>
              </div>
              <span class="badge badge-secondary badge-pill"></span>
            </h4>
            <ul class="list-group mb-3">
                  {cart ? cart.details.map((p) => {
                    return(
              <li class="list-group-item d-flex justify-content-between lh-condensed">
                    <>
                    <div key={p.id}>
                      <h6 class="my-0">Product name: {p.name}</h6>
                      <img src={p.img} className={s.small} alt=""></img>
                      <small class="text-muted">Brief description: {p.description}</small>
                      <hr />
                    </div>
                    <span class="text-muted">Qty:{p.bundle}</span>
                    <span class="text-muted">Price:{numberFormat(p.price)}</span>
                    </>
                </li> )
                }): null
              }
  
                <li class="list-group-item d-flex justify-content-between bg-light">
                  <div class="text-success">
                    <h6 class="my-0">Promo code</h6>
                    <small>EXAMPLECODE</small>
                  </div>
                  <span class="text-success">-$5</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  <span>Total (AR)</span>
                  <strong>{numberFormat(total_amount)}</strong>
                </li>
              </ul>
            <form class="card p-2">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Promo code"
                />
                <div class="input-group-append">
                  <button type="submit" class="btn btn-secondary">
                    Redeem
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="col-md-6 order-md-1">
            <div className={s.subtitulo}>
              <p>Billing Address</p>
            </div>
            {user ? (
            <form class="needs-validation" noValidate onSubmit={handleSubmit}>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label htmlFor="name" className={s.label}>
                    Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="name"
                    placeholder=""
                    value={input.name}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>
                  {errors.name && <p class="text-danger">{errors.name}</p>}

                <div class="col-md-6 mb-3">
                  <label htmlFor="last_name" className={s.label}>
                    Last name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="last_name"
                    placeholder=""
                    value={input.last_name}
                    onChange={handleChange}
                    required
                  />
                  
                  <div class="invalid-feedback">
                    Valid last name is required.
                  </div>
                </div>
              </div>
              {errors.last_name && <p class="text-danger">{errors.last_name}</p>}

              <div class="mb-3">
                <label htmlFor="email" className={s.label}>
                  Email
                </label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">@</span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    name="email"
                    value={input.email}
                    placeholder="Email"
                    onChange={handleChange}
                    required
                  />
                  <div class="invalid-feedback">
                    Please enter a valid email address for shipping updates.
                  </div>
                </div>
              </div>


              <div class="mb-3">
                <label htmlFor="address" className={s.label}>
                  Address: street - city - postal-code - country
                </label>
                <input
                  type="text"
                  class="form-control"
                  name="address"
                  value={input.address}
                  placeholder="1234 Main St"
                  onChange={handleChange}
                  required
                />
                <div class="invalid-feedback">
                  Please enter your shipping address.
                </div>
              </div>
              {errors.address && <p class="text-danger">{errors.address}</p>}

              <div class="mb-3">
                <label htmlFor="phone_number" className={s.label}>
                  Phone Number <span class="text-muted">(Optional)</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  name="phone_number"
                  value={input.phone_number}
                  placeholder="Only Numbers"
                  onChange={handleChange}
                  required
                />
              </div>
            
              <hr />
              <div className={s.subtitulo}>
                <p>Payment</p>
              </div>
              <div class="d-block my-3">
                <div class="custom-control custom-radio">
                  <input
                    name="payment_method"              
                    type="checkbox"
                    class="custom-control-input"
                    value="paypal"
                    onChange={handleChange}
                    checked
                    required
                  />
                  <label
                    class="custom-control-label"
                    htmlFor="payment_method"
                    className={s.label}

                  >
                    PayPal
                  </label>
                </div>
              </div>
              <hr class="mb-4" />
              <div className="d-grid">
                <button class={s.btn} type="submit">
                  Proceed to Payment
                </button>
              </div>
              {errors.payment_method && <p class="text-danger">{errors.payment_method}</p>}
            </form>):null}
          </div>
        </div>
      </div>
      </div>
<<<<<<< HEAD
       {/* <Footer />  */}
=======
      <foot>
        <Footer />  

      </foot>
>>>>>>> 2515eea10461c6cb5eec9b21830abeaafd514cb3
     
      {/* <footer class="my-5 pt-5 text-muted text-center text-small">
        <p class="mb-1">© 2022 - 2045 cell city</p>
        <ul class="list-inline">
          <li class="list-inline-item">
            <Link to="#">Privacy</Link>
          </li>
          <li class="list-inline-item">
            <Link to="#">Terms</Link>
          </li>
          <li class="list-inline-item">
            <Link to="#">Support</Link>
          </li>
        </ul>
      </footer> */}
    </div>
  );
}

export default CheckoutSteps;
