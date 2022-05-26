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
import PrivateRoute from './components/admin/adminPage/PrivateRoute';
import CheckoutSteps from './components/checkout/CheckoutSteps';
import OrderDetail from './components/checkout/OrderDetail';
import Shopping from './components/myShopping/Shopping';
import Review from './components/review/Review';
import Favorites from './components/Favorites/Favorites';
import { ToastContainer } from 'react-toastify';

function App() {
  
  return (
    <Fragment>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/admin' element={<PrivateRoute><AdminPage/></PrivateRoute>}/>
        <Route path ='/login' element={<Login />} />
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
