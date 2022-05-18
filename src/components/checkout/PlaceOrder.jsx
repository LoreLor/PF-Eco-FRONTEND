import React from 'react';
//import { useDispatch, useSelector } from 'react-redux';
import { useNavigate , Link} from 'react-router-dom';
//import { createOrder } from '../actions/orderActions';
import CheckoutSteps from './CheckoutSteps';




function PlaceOrder() {
    //const cart = useSelector((state) => state.cart);
    // const navigate = useNavigate();

    // const dispatch = useDispatch();

    // const orderCreate = useSelector((state) => state.orderCreate);
    // const { loading, success, order, error} = orderCreate;

    const cart =[
        {
            name: "samsung galaxy s22 ultra",
            img: ["https://images.samsung.com/is/image/samsung/p6pim/ar/2202/gallery/ar-galaxy-s22-ultra-s908-sm-s908ezgmaro-530923136"],
            price: 219000,
            description: "Con la mejor cámara, rendimiento y conectividad en un smartphone Galaxy, el Galaxy S22 Ultra reinventa la experiencia móvil al fusionar las funciones favoritas de los fanáticos de las series Note y S.",
            rating: 0,
            stock: 25,
            categories: ["samsung"]
        },
        
        {
            name: "Samsung Galaxy M23 5G",
            img: ["https://images.samsung.com/is/image/samsung/p6pim/es/sm-m236bzggeub/gallery/es-galaxy-m23-5g-sm-m236-sm-m236bzggeub-531473026?$2160_1728_PNG$"],
            price: 57200,
            description: "El Samsung Galaxy M23 5G es uno de los móviles de la firma coreana que presumen de características puntualmente destacadas, a pesar de estar catalogado como un teléfono de gama media.",
            rating: 0,
            stock: 25,
            categories: ["samsung"]
        },
    
        {
            name: "Samsung Galaxy A53 5G",
            img: ["https://images.samsung.com/is/image/samsung/p6pim/ar/2202/gallery/ar-galaxy-a53-5g-a536-sm-a536ezkaaro-531544682?$2160_1728_PNG$"],
            price: 79640,
            description: "Uno de los smartphones más importantes en el catálogo de Samsung es el Galaxy A53 5G, que nos ofrece un año más una gran oportunidad de tener tecnología de alto nivel, sin tener que pagar demasiado.",
            rating: 0,
            stock: 25,
            categories: ["samsung"]
        },
    
        {
            name: "Samsung Galaxy A13",
            img: ["https://images.samsung.com/is/image/samsung/p6pim/ar/sm-a135mzkkaro/gallery/ar-galaxy-a13-sm-a135-sm-a135mzkkaro-532207027?$650_519_PNG$"],
            price: 44220,
            description: "Un smartphone de relación calidad precio que no pasa por alto ningún elemento. Todo ello unido al buen software, nos asegura tener teléfono móvil para varios años.",
            rating: 0,
            stock: 25,
            categories: ["samsung"]
        },
    
        {
            name: "Samsung Galaxy S21 FE 5G",
            img: ["https://samsungar.vtexassets.com/arquivos/ids/177914/Samsung-97798753-ar-galaxy-s21-fe-g990-sm-g990elgaarm-530627001Download-Source.png?v=637788851897970000"],
            price: 182380,
            description: "Un dispositivo confiable que, lo que hace, lo hace muy bien. La firma de tecnología es una experta teniendo terminales bonitos y eficientes y esto es una clara muestra de ello.",
            rating: 0,
            stock: 25,
            categories: ["samsung"]
        },
    
    ]





    //order summary
    const toPrice = (num) => Number(num.toFixed(2)); //ejemplo 6.123 -'5.12' - 5.12
    cart.itemsPrice = toPrice(cart.reduce((a, c) => a + c.qty * c.price, 0));
    cart.shippingPrice = cart.itemsPrice > 1000 ? toPrice(0) : toPrice(100);
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
      

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        // dispatch(createOrder({...cart, orderItems: cart.cartItems}));
    };

    // useEffect(() => {
    //     if(!cart.paymentMethod){
    //         navigate('/payment')
    //     }  
    //     if (success) {
    //         navigate(`/order/${order._id}`);
    //         dispatch({type:CART_EMPTY})
    //   }
    // }, [dispatch, order, navigate, success, cart]);
    
    return (
    <div>
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
        <div className='row top'>
            <div className='col-2'>
                <ul>
                    <li>
                        <div className='card card-body'>
                            <h2>Shipping</h2>
                            <div>
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
                            {cart.map((item) => {
                                return (
                                <li key={item.id}>
                                    <div className='row'> 
                                        <div>
                                            <img 
                                                src={item.img} 
                                                alt={item.name} 
                                                className='small'>
                                            </img>
                                        </div>                                 
                                        <div className='min-30'>
                                            <Link to={`/product/${item.id}`}>{item.name}</Link>
                                        </div>                
                                        <div>{item.qty} x $ {item.price.toFixed(2)} ={' '} $ {item.qty* item.price}</div>
                                    </div>
                                    </li>
                                 )})}
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
                                <div>$ {cart.itemsPrice.toFixed(2)}</div>
                            </div>
                        </li>
                        <li>
                            <div className='row'>
                                <div>Shipping</div>
                                <div>$ {cart.shippingPrice.toFixed(2)}</div>
                            </div>
                        </li>
                        <li>
                            <div className='row'>
                                <div>Tax</div>
                                <div>$ {cart.taxPrice.toFixed(2)}</div>
                            </div>
                        </li>
                        <li>
                            <div className='row'>
                                <div>
                                    <strong>Order Total</strong>
                                </div>
                                <div>
                                    <strong>$ {cart.totalPrice.toFixed(2)}</strong>
                                </div>
                            </div>
                        </li>
                        <li>
                            <button 
                                type='button'                               
                                onClick={handlePlaceOrder} 
                                className='primary block'
                                // disabled={cart.cartItems.length === 0}
                                >
                                    Place Order
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
};

export default PlaceOrder