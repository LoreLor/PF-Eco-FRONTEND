import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { getCategories } from '../../redux/actions/categories'
import { getAllProducts } from '../../redux/actions/products'
import CategoriesSB from './userAdmin/searchBars/categoriesSB'
import ProductsSB from './userAdmin/searchBars/productsSB'
import style from './AdminPage.module.css'

export default function AdminPage (){
    const categories = useSelector((state)=> state.products.categoriesDb)
    const products = useSelector((state)=> state.products.products)
    const dispatch = useDispatch()

    const [categoryName,setCategoryName] = useState("")
    const [category,setCategory] = useState("")
    const [productName,setProductName]= useState("")
    const [product,setProduct]= useState("")
    
    useEffect(()=>{
        dispatch(getCategories())
        dispatch(getAllProducts())
    },[dispatch])


    return(
        <div>
            <header><h1 className={style.hola}>DashBoard</h1></header>
            <div className={style.adminPage}>

                <div className={style.box}>
                    <h2>Users</h2>  
                    <Link to='/admin/userAdmin'>
                        <button className={style.mybtn}>Authorize User</button>
                    </Link>
                </div>

                <div className={style.box}>
                    <h2>Categories</h2>
                    <Link to='/admin/categoryAdmin/'>
                        <button className={style.mybtn}>Create category</button>
                    </Link>
                    <CategoriesSB categories={categories} categoryName={categoryName} 
                    category={category} setCategoryName={setCategoryName} setCategory={setCategory}/>
                </div>

                <div className={style.box}>
                    <h2>Products</h2>
                    <Link to='/admin/productAdmin'>
                        <button className={style.mybtn}>Create product</button>
                    </Link>
                    <ProductsSB products={products} productName={productName} 
                    product={product} setProductName={setProductName} setProduct={setProduct}/>
                </div>
                <Link to="/">
                    <button className={style.mybtn}p>Go Back</button>
                </Link>
            </div>
        </div>
    )
}