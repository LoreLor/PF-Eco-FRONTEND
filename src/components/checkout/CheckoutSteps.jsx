import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate} from "react-router-dom";
import inputValidations from "../checkout/validations/inputValidations";
import {getSingleUser, userUpdate} from '../../redux/actions/user'
import { closeCart, getCart, paidCartTemporal, applyDiscount } from "../../redux/actions/products";
import s from "./CheckoutSteps.module.css";
import Footer from "../Footer/Footer";
import numberFormat from "../detalleProducto/numberFormat";
import submitValidations from "../registro/validators/submitValidations";
import Swal from 'sweetalert2';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';



function CheckoutSteps() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.users.userInfo)
  const cart = useSelector((state) => state.products.cart)
 
  const [errors, setErrors] = useState({});

  //---- Cupon de Descuento
  const [hasDiscount, setHasDiscount] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [errorCode, setErrorCode] = useState(false)

  //---- Total y Deescuentos
  const toPrice = (num) => Number(num.toFixed(2)); //ejemplo 6.123 -'5.12' - 5.12
  // const amount= toPrice(cart.details.reduce((a, c) => a + c.bundle * c.price, 0));
  const discount = promoCode?(cart.price_total*0.25):""
  const total_amount= (cart.price_total)
  const total_amountDiscount= (total_amount - discount)
  


  const [input, setInput] = useState({
    name: user.name,
    last_name: user.last_name,
    phone_number:user.phone_number,
    email: user.email,
    address:user.address,
    payment_method: "",
  
  })


  useEffect(()=>{
    dispatch(getSingleUser(user.id))
    .then( () => {
      dispatch(getCart(user.id))
    })
  }, [user])

  const handleChange = (e) =>{
    e.preventDefault();
    setErrors(
      inputValidations({
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
      setErrors(submitValidations(input))
      if (Object.keys(errors).length === 0 
      && input.name !== ""
      && input.last_name !== ""
      && input.address !== ""
      && input.phone_number !== "")
      setInput(input)
      dispatch(userUpdate(user.id, input))
      dispatch(getCart(user.id))
      dispatch(applyDiscount(cart.id, total_amountDiscount))
      navigate('/order')  
    } 
    
    const checkDiscount = (e) => {
      e.preventDefault();
      if(promoCode === "HENRYCELL"){
       
        setPromoCode('HENRYCELL')
        setHasDiscount(true);
        setErrorCode(false)
        // if(!hasDiscount) {
        //   dispatch(applyDiscount(cart.id,total_amountDiscount))
        // }
      }else{
        setHasDiscount(false)
        setErrorCode(true)
        Swal.fire({
          title: 'Verify your Promo Code',
          text:'Verify your Promo Code',
          icon:'error'
        })
      }
    }



  return (
    <div className={s.box}>
    <div className={s.contenedor}>
      <div className="container">
        <div classname="py-5 text-center">
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

        <div className="row">
          <div className="col-md-6 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <div className={s.subtitulo}>
                <p>Your Cart</p>
              </div>
              <span classname="badge badge-secondary badge-pill"></span>
            </h4>
            <ul className="list-group mb-3">
                  {cart ? cart.details.map((p) => {
                    return(
              <li key={p.id} class="list-group-item d-flex justify-content-between lh-condensed">
                    <>
                    <div key={p.id}>
                      <h6 className="my-0">Product name: {p.name}</h6>
                      <img src={p.img} className={s.small} alt=""></img>
                      <small class="text-muted">Qty: {p.bundle}</small>
                      <hr />
                    </div>
                    <span className="text-muted"></span>
                    <span className="text-muted">Price: ${''}{numberFormat(p.price_total)}</span>
                    </>
                </li> )
                }): null
              }
  
                <li className="list-group-item d-flex justify-content-between bg-light">
                  <div className="text-success">
                    <h6 className="my-0">Promo code</h6>
                    <small>{promoCode}</small>
                  </div>
                  <span classname="text-success">${' '}{discount}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total Amount </span>
                  <strong>${' '}{hasDiscount===false? total_amount:total_amountDiscount}</strong>
                </li>
              </ul>
            <form classname="card p-2" >
              <div className="input-group">
                <input
                    type="text"
                    class="form-control"
                    placeholder="Promo code"
                    onChange={(e) =>{setPromoCode(e.target.value)}}
                />
                <div className="input-group-append">
                  <button 
                    type="submit" 
                    class="btn btn-secondary"
                    onClick={checkDiscount}
                    disabled={hasDiscount}
                  >
                    Apply Promo
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-6 order-md-1">
            <div className={s.subtitulo}>
              <p>Billing Address</p>
            </div>
            {user ? (
            <form className="needs-validation align-item-strecht" validate onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="name" className={s.label}>
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder=""
                    value={input.name}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Valid first name is required.
                  </div>
                  {errors.name && <p className="text-danger">{errors.name}</p>}
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="last_name" className={s.label}>
                    Last name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="last_name"
                    placeholder=""
                    value={input.last_name}
                    onChange={handleChange}
                    required
                  />
                  
                  <div className="invalid-feedback">
                    Valid last name is required.
                  </div>
                </div>
              {errors.last_name && <p class="text-danger">{errors.last_name}</p>}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className={s.label}>
                  Email
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">@</span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    value={input.email}
                    placeholder="Email"
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Please enter a valid email address for shipping updates.
                  </div>
                </div>
              {errors.email && <p class="text-danger">{errors.email}</p>}
              </div>


              <div className="mb-3">
                <label htmlFor="address" className={s.label}>
                  Address: street - city - postal-code - country
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={input.address}
                  placeholder="1234 Main St"
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">
                  Please enter your shipping address.
                </div>
              {errors.address && <p className="text-danger">{errors.address}</p>}
              </div>

              <div className="mb-3">
                <label htmlFor="phone_number" className={s.label}>
                  Phone Number <span class="text-muted"></span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="phone_number"
                  value={input.phone_number}
                  placeholder="Only Numbers"
                  onChange={handleChange}
                  required
                />
              {errors.phone_number && <p className="text-danger">{errors.phone_number}</p>}
              </div>
            
              <hr />
              {/* <div className={s.subtitulo}>
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
              </div> */}
              <hr className="mb-4" />
              <div className="d-grid">
                <button className={s.btn} type="submit">
                  Proceed to Payment
                </button>
              </div>
            </form>
            ) : null
          }
          </div>
        </div>
          <button className={s.btn} onClick={()=>navigate('/cart')}><ArrowLeftIcon > </ArrowLeftIcon>GO BACK</button>
      </div>
      </div>
      <Footer />  
    </div>
  );
}

export default CheckoutSteps;
