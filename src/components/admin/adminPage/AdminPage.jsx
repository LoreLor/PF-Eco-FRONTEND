import { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { getCategories } from '../../../redux/actions/categories'
import { getAllProducts } from '../../../redux/actions/products'
import { getAllUsers } from '../../../redux/actions/user'
import CategoriesSB from './searchBars/categoriesSB'
import ProductsSB from './searchBars/productsSB'
import style from './AdminPage.module.css'
import Banner from '../Banner'
import UserAdmin from '../userAdmin/UserAdmin'
import UserSB from './searchBars/userSB'

export default function AdminPage (){
    const categories = useSelector((state)=> state.products.categoriesDb)
    const products = useSelector((state)=> state.products.products)
    const users = useSelector((state)=>state.users.users)
    const dispatch = useDispatch()

    const [userName,setUserName]= useState("")
    const [user,setUser] = useState("")
    const [categoryName,setCategoryName] = useState("")
    const [category,setCategory] = useState("")
    const [productName,setProductName]= useState("")
    const [product,setProduct]= useState("")
    console.log(userName)
    console.log(user)
    const [modalA,setModalA] = useState(false)
    
    useEffect(()=>{
        dispatch(getCategories())
        dispatch(getAllProducts())
        dispatch(getAllUsers())
    },[dispatch])


    return(
        <div>
            <header><h1 className={style.hola}>Admin</h1></header>
            <div className={style.adminPage}>

                <div className={style.box}>
                    <h2>Users</h2> 
                <UserSB users={users} userName={userName} user={user} setUserName={setUserName}
                setUser={setUser} setModalA={setModalA}/>
                </div>
                <Banner setIsOpen={setModalA} isOpen={modalA}>
                        <UserAdmin user={user[0]} setModalA= {setModalA} setUser={setUser}/>
                    </Banner> 
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