// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import CheckoutSteps from './CheckoutSteps';
// import s from './ShippingAddress.module.css'

// function ShippingAddress() {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const userInfo = useSelector((state) => state.user);
//     //const cart = useSelector((state) => state.cart);
//     //const {shippingAddress} = cart;

//     const [input, setInput]= useState({
//         name: userInfo.name, //shippingAddress.name,
//         last_name:userInfo.last_name, //shippingAddress.last_name,
//         user_name: userInfo.user_name,//shippingAddress.user_name,
//         email: userInfo.email,
//         address: userInfo.address,
//         phone_number: userInfo.phone_number

//     })
//     const [paymentMethod, setPaymentMethod] = useState(' ');
    

//     useEffect(() => {
//         if(!userInfo){
//         navigate('/signIn')
//         }
//     }, [navigate, userInfo]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         //dispatch(saveShippingAddress({ address, phone_number}));
//         navigate('/order')
//     }
    



//   return (
//         <div>
//             <CheckoutSteps step1 step2></CheckoutSteps>
//             <div className={s.form}>
//             <form className='form' onSubmit={handleSubmit}>
//                 <div>
//                     <h1>Shipping Address</h1>
//                 </div>
//                 <div>
//                 <label htmlFor='name'>Name</label>
//                     <input
//                         id='name'
//                         type='text'
//                         value={input.name}
//                         placeholder='Enter your Full Name'
//                         onChange={(e)=> setInput(e.target.value)}
//                         required
//                     >
//                     </input>
//                 </div>
//                 <div>
//                 <label htmlFor='last_name'>Last Name</label>
//                     <input
//                         id='last_name'
//                         type='text'
//                         value={input.last_name}
//                         placeholder='Enter your Last Name'
//                         onChange={(e)=> setInput(e.target.value)}
//                         required
//                     >
//                     </input>
//                 </div>
//                 <div>
//                 <label htmlFor='address'>Address</label>
//                     <input
//                         id='address'
//                         type='text'
//                         value={input.address}
//                         placeholder='Enter your Address'
//                         onChange={(e)=> setInput(e.target.value)}
//                         required
//                         >
//                     </input>
//                 </div> 
//                 <div>
//                 <label htmlFor='phone_number'>Phone Number</label>
//                     <input
//                         id='phone_number'
//                         type='text'
//                         value={input.phone_number}
//                         placeholder='Enter your Last Name'
//                         onChange={(e)=> setInput(e.target.value)}
//                         required
//                     >
//                     </input>
//                     <div>
//                     <input
//                         type='radio'
//                         id='paypal'
//                         value='PayPal'
//                         name='paymentMethod'
//                         required
//                         onChange={(e) => setPaymentMethod(e.target.value)}
//                         >   
//                     </input>  
//                     <label htmlFor='paypal'>PayPal</label>
//                 </div>
//                 </div>    
//                 <div>
//                     <label />
//                     <button 
//                         className={s.btn}
//                         type='submit'
//                     >Continue
//                     </button>
//                 </div>
//             </form>
//         </div>
//     </div>
//   )
// }


// export default ShippingAddress