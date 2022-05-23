
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams} from 'react-router-dom';
//import { PayPalButton } from 'react-paypal-button-v2';

import axios from 'axios';
import { getShopping, paidCartTemporal } from '../../redux/actions/products';



function OrderDetail() {
    const dispatch = useDispatch();
    const {id} = useParams()
    
    const [sdkReady, setSdkReady] = useState(false);
    const cart = useSelector((status) => status.products.cart)
    const shopping= useSelector((state) => state.products.shopping);
    const user = useSelector((state) => state.users.userInfo)
  console.log('shopping',shopping)
    
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
         
            dispatch(getShopping(id));
     
            if (cart.status!=='paid') {
              if (!window.paypal) {
                addPayPalScript();
              } else {
                setSdkReady(true);
              }
            }     
        }, [dispatch,id, sdkReady, cart, shopping]);
      




    const handlePayPal = ( paymentResult)=>{
        dispatch(paidCartTemporal(shopping, paymentResult))
    
    }

    
  return (
        <div>
            <div>
                <h1>Order: {' '} {id}</h1>
                <div className='row top'>
                    <div className='col-2'>
                        <ul>
                            <li>
                                <div className='card card-body'>
                                    <h2>Shipping</h2>
                                    <div >
                                        <strong>Name:{' '}</strong>
                                        <br />
                                        <strong>Address:{' '}</strong> 
                                        <br />
                                        <strong>City:{' '}</strong>
                                        <br />
                                        <strong>Postal Code:{' '}</strong>
                                        <br />
                                        <strong>Country:{' '}</strong>
                                        
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className='card card-body'>
                                    <h2>Payment</h2>
                                    <p>
                                        <strong>Method:{' '}</strong>      
                                    </p>
                                
                                </div>
                            </li>
                            <li>
                                <div className='card card-body'>
                                    <h2>Order Items</h2>
                                    <ul>
                                    
                                        <li >
                                            <div className='row'> 
                                                <div>
                                                    <img 
                                                        src='holass' 
                                                        alt='jajaj'
                                                        className='small'>
                                                    </img>
                                                </div>                                 
                                                <div className='min-30'>
                                                    <Link to={`/product/${id}`}>nombre producto</Link>
                                                </div>                
                                                <div> x $  ={' '} $</div>
                                            </div>
                                            </li>
                                     
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className='col-1'>
                        <div className='card card-body'>
                            <ul>
                                <li>
                                    <h2>Order Summary</h2>
                                </li>
                                <li>
                                    <div className='row'>
                                        <div>Items</div>
                                        <div>$</div>
                                    </div>
                                </li>
                                <li>
                                    <div className='row'>
                                        <div>Shipping</div>
                                        <div>$ </div>
                                    </div>
                                </li>
                                <li>
                                    <div className='row'>
                                        <div>Tax</div>
                                        <div>$ </div>
                                    </div>
                                </li>
                                <li>
                                    <div className='row'>
                                        <div>
                                            <strong>Order Total</strong>
                                        </div>
                                        <div>
                                            <strong>$ </strong>
                                        </div>
                                    </div>
                                </li>
                               
                                    <li>
                                        {sdkReady ? 
                                      
                                            <>
                                           
                                            {/* <PayPalButton
                                                amount='hola'
                                                onSuccess={handlePayPal}>
                                            </PayPalButton> */}
                                            </>
                                        : null}
                                    </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div> 
        
    </div>        
    )
}

export default OrderDetail