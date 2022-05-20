import React,{Fragment} from 'react';
import './App.css';
import Home from './components/home/Home'
import AdminPage from './components/admin/adminPage/AdminPage'
import ProductAdmin from './components/admin/productForm/ProductAdmin'
import {Routes,Route} from 'react-router-dom'
import Login from './components/login/Login';
import ProductDetail from './components/detalleProducto/ProductDetail';
import Error404 from './components/Error404/Error404';
import Register from './components/registro/Register';
import Cart from './components/cart/Cart';
import PrivateRoute from './components/admin/adminPage/PrivateRoute';

function App() {
  
  return (
    <Fragment>
      
      <Routes>
      <Route path='/' element={<Home/>}/>
        <Route path='/admin' element={<PrivateRoute><AdminPage/></PrivateRoute>}/>
        <Route path='/admin/productAdmin' element={<ProductAdmin/>}/>
        <Route path='/admin/productAdmin/:id' element={<ProductAdmin/>}/>
        <Route path ='/login' element={<Login />} />
        <Route path = '/home/:id' element={<ProductDetail/>}/>
        <Route path = '/cart'element={<Cart/>}/>
        <Route path = '/register' element={<Register />} />
        <Route path={'*'} element={<Error404/>}/>
      </Routes>
    </Fragment>
  );
}

export default App;
