import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { getCategories } from '../../redux/actions/categories'
import { getAllProducts } from '../../redux/actions/products'
import CategoriesSB from './userAdmin/searchBars/categoriesSB'
import ProductsSB from './userAdmin/searchBars/productsSB'

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
            <div><h1>Admin Page</h1></div>
            <div>
                <h2>Users</h2>
                <span>Authorize permissions</span>
                <Link to='/admin/userAdmin'>
                    <p>Authorize User</p>
                </Link>
            </div>
            <div>
                <h2>Categories</h2>
                <span>Create or edit a category</span>
                <Link to='/admin/categoryAdmin/'>
                    <p>Create category</p>
                </Link>
                <CategoriesSB categories={categories} categoryName={categoryName} 
                category={category} setCategoryName={setCategoryName} setCategory={setCategory}/>
            </div>
            <div>
                <h2>Products</h2>
                <span>Create or edit a product</span>
                <Link to='/admin/productAdmin'>
                    <p>Create product</p>
                </Link>
                <ProductsSB products={products} productName={productName} 
                product={product} setProductName={setProductName} setProduct={setProduct}/>
            </div>
            <Link to="/">
                <p>Go Back</p>
            </Link>
        </div>
    )
}