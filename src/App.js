import React,{Fragment} from 'react';
import './App.css';
import Home from './components/home/Home'
import AdminPage from './components/admin/AdminPage'
import CategoryAdmin from './components/admin/categoryForm/CategoryAdmin'
import ProductAdmin from './components/admin/productForm/ProductAdmin'
import UserAdmin from './components/admin/userAdmin/UserAdmin'
import {Routes,Route} from 'react-router-dom'
import Login from './components/login/Login';

function App() {
  
  const userInfo=JSON.parse(localStorage.getItem('userInfo'))?.user_name ? localStorage.getItem('userInfo') : localStorage.setItem('userInfo', JSON.stringify([]))
  console.log(userInfo)
  
  return (
    <Fragment>
      <Routes>
      <Route path='/' element={<Home/>}/>
        <Route path='/admin' element={<AdminPage/>}/>
        <Route path='/userAdmin' element={<UserAdmin/>}/>
        <Route path='/productAdmin' element={<ProductAdmin/>}/>
        <Route path ='/categoryAdmin' element={<CategoryAdmin/>}/>
        <Route path ='/login' element={<Login />} />
      </Routes>
    </Fragment>
  );
}

export default App;
