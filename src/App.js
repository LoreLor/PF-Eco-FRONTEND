
import React,{Fragment} from 'react';
import './App.css';
import Home from './components/home/Home'
import AdminPage from './components/admin/AdminPage'
import CategoryAdmin from './components/admin/CategoryAdmin'
import ProductAdmin from './components/admin/ProductAdmin'
import UserAdmin from './components/admin/UserAdmin'
import {Routes,Route} from 'react-router-dom'

function App() {
  return (
    <Fragment>
      <Routes>
      <Route path='/' element={<Home/>}/>
        <Route path='/admin' element={<AdminPage/>}/>
        <Route path='/userAdmin' element={<UserAdmin/>}/>
        <Route path='/productAdmin' element={<ProductAdmin/>}/>
        <Route path ='/categoryAdmin' element={<CategoryAdmin/>}/>
      </Routes>
    </Fragment>
  );
}

export default App;
