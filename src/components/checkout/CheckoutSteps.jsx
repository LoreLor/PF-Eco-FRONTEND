import React from 'react'
import s from './CheckoutSteps.module.css'


function CheckoutSteps(props) {
  return (
    <div className={s.contenedor}>
    <div className='row checkout-steps'>
        <div className={props.step1 ? 'active':''}>Sign In</div>
        <div className={props.step2 ? 'active':''}>Shipping</div>
        <div className={props.step4 ? 'active':''}>Place Order</div>
    </div>

    </div>
  )
}

export default CheckoutSteps