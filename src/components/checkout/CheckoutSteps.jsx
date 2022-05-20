import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import image1 from '../../assets/celulares2.jpg';
import s from './CheckoutSteps.module.css'



function CheckoutSteps() {
  return (
    <div className={s.contenedor}>

      <div class="container">
      <div class="py-5 text-center">     
        <h2 className={s.title}>Checkout <div><NavLink to="/" className={s.titulo}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-phone" viewBox="0 0 16 16">
                            <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z"/>
                            <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                        </svg>
                        City Cell
                    </NavLink></div></h2>
      </div>
    
      <div class="row">
        <div class="col-md-6 order-md-2 mb-4">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <div className={s.subtitulo}>
              <p>Your Cart</p>
            </div>
            <span class="badge badge-secondary badge-pill">3</span>
          </h4>
          <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <div >
                <h6 class="my-0">Product name</h6>
                <img src={image1} className={s.small} alt=''></img>
                <small class="text-muted">Brief description</small>
                <hr/>
              </div>
              <span class="text-muted">Qty:</span>
              <span class="text-muted">Amount:</span>
            </li>
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <div>
              <h6 class="my-0">Product name</h6>
                <img src={image1} className={s.small} alt=''></img>
                <small class="text-muted">Brief description</small>
                <hr/>
              </div>
              <span class="text-muted">Qty:</span>
              <span class="text-muted">Amount:</span>
            </li>
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <div>
              <h6 class="my-0">Product name</h6>
                <img src={image1} className={s.small} alt=''></img>
                <small class="text-muted">Brief description</small>
                <hr/>
              </div>
              <span class="text-muted">Qty:</span>
              <span class="text-muted">Amount:</span>
            </li>
            <li class="list-group-item d-flex justify-content-between bg-light">
              <div class="text-success">
                <h6 class="my-0">Promo code</h6>
                <small>EXAMPLECODE</small>
              </div>
              <span class="text-success">-$5</span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span>Total (USD)</span>
              <strong>$20</strong>
            </li>
          </ul>
    
          <form class="card p-2">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Promo code"/>
              <div class="input-group-append">
                <button type="submit" class="btn btn-secondary">Redeem</button>
              </div>
            </div>
          </form>
        </div>
        <div class="col-md-6 order-md-1">
          <div className={s.subtitulo}>
          <p>Billing Address</p>
          </div>
          <form class="needs-validation" novalidate>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="firstName">First name</label>
                <input type="text" class="form-control" id="firstName" placeholder="" value="" required/>
                <div class="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="lastName">Last name</label>
                <input type="text" class="form-control" id="lastName" placeholder="" value="" required/>
                <div class="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>
    
            <div class="mb-3">
              <label for="username">Username</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">@</span>
                </div>
                <input type="text" class="form-control" id="username" placeholder="Username" required/>
                <div class="invalid-feedback" >
                  Your username is required.
                </div>
              </div>
            </div>
    
            <div class="mb-3">
              <label for="email">Email <span class="text-muted">(Optional)</span></label>
              <input type="email" class="form-control" id="email" placeholder="you@example.com"/>
              <div class="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>
    
            <div class="mb-3">
              <label for="address">Address</label>
              <input type="text" class="form-control" id="address" placeholder="1234 Main St" required/>
              <div class="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>
    
            <div class="mb-3">
              <label for="address2">Address 2 <span class="text-muted">(Optional)</span></label>
              <input type="text" class="form-control" id="address2" placeholder="Apartment or suite"/>
            </div>
    
            
            <hr class="mb-4"/>
            
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="save-info"/>
              <label class="custom-control-label" for="save-info">Save this information for next time</label>
            </div>
            <hr class="mb-4"/>
    
            <h4 class="mb-3">Payment</h4>
    
            <div class="d-block my-3">
              
              <div class="custom-control custom-radio">
                <input id="paypal" name="paymentMethod" type="radio" class="custom-control-input" required/>
                <label class="custom-control-label" for="paypal">PayPal</label>
              </div>
            </div>
            
            <hr class="mb-4"/>
            <button class="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
          </form>
          </div>
        </div>
      </div>
    
      <footer class="my-5 pt-5 text-muted text-center text-small">
        <p class="mb-1">© 2022 - 2045 cell city</p>
        <ul class="list-inline">
          <li class="list-inline-item"><Link to="#">Privacy</Link></li>
          <li class="list-inline-item"><Link to="#">Terms</Link></li>
          <li class="list-inline-item"><Link to="#">Support</Link></li>
        </ul>
      </footer>
    </div>
 
  );
}

export default CheckoutSteps