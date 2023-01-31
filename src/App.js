import React,{Fragment} from 'react';
import './App.css';
import Home from './components/home/Home'
import AdminPage from './components/admin/adminPage/AdminPage'
import {Routes,Route} from 'react-router-dom'
import Login from './components/login/Login';
import ProductDetail from './components/detalleProducto/ProductDetail';
import Error404 from './components/Error404/Error404';
import Register from './components/registro/Register';
import Cart from './components/cart/Cart';
import PrivateAdmin from './components/admin/adminPage/PrivateAdmin';
//import PrivateUser from './components/login/PrivateUser'
import PrivateProfile from './components/userProfile/PrivateProfile'
import CheckoutSteps from './components/checkout/CheckoutSteps';
import OrderDetail from './components/checkout/OrderDetail';
import Shopping from './components/myShopping/Shopping';
import Review from './components/review/Review';
import Favorites from './components/Favorites/Favorites';
import { ToastContainer } from 'react-toastify';
import  UserProfile  from './components/userProfile/UserProfile';
import UsersPage from './components/admin/manageUsers/MainPage';
import CategoriesPage from './components/admin/manageCategories/MainPage'
import ProductsPage from './components/admin/manageProducts/MainPage'
import OrdersPage from './components/admin/manageOrders/MainPage'
import ForgotPass from './components/ForgotPassword/ForgotPass';


function App() {
  
  return (
    <Fragment>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/admin' element={<PrivateAdmin><AdminPage/></PrivateAdmin>}/>
        <Route path='/admin/users' element={<PrivateAdmin><UsersPage/></PrivateAdmin>}/>
        <Route path='/admin/categories' element={<PrivateAdmin><CategoriesPage/></PrivateAdmin>}/>
        <Route path='/admin/products' element={<PrivateAdmin><ProductsPage/></PrivateAdmin>}/>
        <Route path='/admin/orders' element={<PrivateAdmin><OrdersPage/></PrivateAdmin>}/>
        <Route path='/profile' element={<PrivateProfile><UserProfile/></PrivateProfile>}/>
        <Route path ='/login' element={<Login />} />
        <Route path = '/home/:id' element={<ProductDetail/>}/>
        <Route path = '/cart' element={<Cart/>}/>
        <Route path='/favs' element = {<PrivateProfile><Favorites/></PrivateProfile>}/>
        <Route path = '/myShopping' element={<PrivateProfile><Shopping/></PrivateProfile>}/>
        <Route path = '/review' element={<PrivateProfile><Review/></PrivateProfile>}/>
        <Route path = '/register' element={<Register />} />
        <Route path="/check" element={<PrivateProfile><CheckoutSteps/></PrivateProfile>}/>
        <Route path="/order" element={<PrivateProfile><OrderDetail/></PrivateProfile>}/>
        <Route path='/forgotPass' element={<ForgotPass/>}/>
        <Route path={'*'} element={<Error404/>}/>
      </Routes>
    </Fragment>
  );
}

export default App;
