import React,{Fragment} from 'react';
import './App.css';
import Home from './components/home/Home'
import AdminPage from './components/admin/adminPage/AdminPage'
import CategoryAdmin from './components/admin/categoryForm/CategoryAdmin'
import ProductAdmin from './components/admin/productForm/ProductAdmin'
import UserAdmin from './components/admin/userAdmin/UserAdmin'
import {Routes,Route} from 'react-router-dom'
import Login from './components/login/Login';
import ProductDetail from './components/detalleProducto/ProductDetail';
import Error404 from './components/Error404/Error404';
import Register from './components/registro/Register';
import Cart from './components/cart/Cart';


function App() {
  
  return (
    <Fragment>
      <Routes>
      <Route path='/' element={<Home/>}/>
        <Route path='/admin' element={<AdminPage/>}/>
        <Route path='/admin/userAdmin' element={<UserAdmin/>}/>
        <Route path='/admin/productAdmin' element={<ProductAdmin/>}/>
        <Route path='/admin/productAdmin/:id' element={<ProductAdmin/>}/>
        <Route path ='/admin/categoryAdmin' element={<CategoryAdmin/>}/>
        <Route path ='/admin/categoryAdmin/:name' element={<CategoryAdmin/>}/>
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
