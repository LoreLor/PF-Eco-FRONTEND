import React, { useState } from 'react';
import {PayPalButtons} from '@paypal/react-paypal-js'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { paidCartTemporal } from '../../redux/actions/products';

function PaypalCheckoutButton() {
    const user = useSelector((state) => state.users.userInfo);
    const cart = useSelector((state) => state.products.cart);
    console.log('cart', cart.price_total)
    const total_amount= (cart.price_total)
    const [ paidFor, setPaidFor ] = useState(false);
    const [ error, setError ] = useState(null);
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const handleApprove = (orderid) => {
        setPaidFor(true)
        //si sale error entonces mensaje al usuario..su compra no pudo ser realizada. contactese con nosotras a la brevedad
    };

    if(paidFor){
        dispatch(paidCartTemporal(user.id,cart.id))
        Swal.fire({
            icon: 'success',
            title: 'Succefully Purchase',
            text: ' Post reviews at your Products ',
            
            footer: navigate('/')
          })
        //redirigir a pagina con mensaje Gracias por su compra..recibira a la brevedad el detalle de su compra
    }

    if(error){
        //mensaje de error
        //mensaje al usuario del error
    }

  return (
    
        <PayPalButtons
            onClick={(data, actions) => {
            //aca va lo quiero que se haga..enviar email, guarda, te direcciona al review
            
        }}
            createOrder= {(data, actions) => {
                return actions.order.create({
                    "purchase_units": [{
                        "amount": {
                        "currency_code": "USD",
                        "value": total_amount
                        },
                    }]
                })
            }}
            onApprove={async(data, actions) =>{
                const order = await actions.order.capture();
                console.log('order', order)
                handleApprove(data.orderID)
            }}
            onCancel={() => {
                //mensaje de cancelacion de compra y retorno al checkout
            }}
            onError={(err) => {
                setError(err);
                console.log('err :>> ', err);
            }}  
        />  
  )
}

export default PaypalCheckoutButton