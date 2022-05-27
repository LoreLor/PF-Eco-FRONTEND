import React,{Fragment} from 'react';
import './App.css';
import Home from './components/home/Home'
import AdminPage from './components/admin/adminPage/AdminPage'
import {Routes,Route, Router} from 'react-router-dom'
import Login from './components/login/Login';
import ProductDetail from './components/detalleProducto/ProductDetail';
import Error404 from './components/Error404/Error404';
import Register from './components/registro/Register';
import Cart from './components/cart/Cart';
import PrivateAdmin from './components/admin/adminPage/PrivateAdmin';
import PrivateUser from './components/login/PrivateUser'
import CheckoutSteps from './components/checkout/CheckoutSteps';
import OrderDetail from './components/checkout/OrderDetail';
import Shopping from './components/myShopping/Shopping';
import Review from './components/review/Review';
import Favorites from './components/Favorites/Favorites';
import { ToastContainer } from 'react-toastify';
<<<<<<< HEAD
import  UserProfile  from './components/userProfile/UserProfile';
=======
import LoginGoogle from './components/login/LoginGoogle';
>>>>>>> login-google-again

function App() {
  
  return (
    <Fragment>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
<<<<<<< HEAD
        <Route path='/admin' element={<PrivateAdmin><AdminPage/></PrivateAdmin>}/>
        <Route path='/profile' element={<UserProfile/>}/>
        <Route path ='/login' element={<PrivateUser><Login /></PrivateUser>} />
=======
        <Route path='/admin' element={<PrivateRoute><AdminPage/></PrivateRoute>}/>
        <Route path ='/login' element={<Login />} />
        <Route path ='/auth/google' element={<LoginGoogle/>}/>
>>>>>>> login-google-again
        <Route path = '/home/:id' element={<ProductDetail/>}/>
        <Route path = '/cart'element={<Cart/>}/>
        <Route path='/favs' element = {<Favorites/>}/>
        <Route path = '/myShopping'element={<Shopping/>}/>
        <Route path = '/review'element={<Review/>}/>
        <Route path = '/register' element={<Register />} />
        <Route path={'*'} element={<Error404/>}/>
        <Route path="/check" element={<CheckoutSteps/>}/>
        <Route path="/order" element={<OrderDetail/>}/>
        
      </Routes>
    </Fragment>
  );
}

export default App;
