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
import CategoryAdmin from "../categoryForm/CategoryAdmin"
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

    const [modalA,setModalA] = useState(false)
    const [modalB,setModalB] = useState(false)
    
    function handleModal(e){
        e.preventDefault()
        setCategory("")
        setModalB(true)
    }

    useEffect(()=>{
        dispatch(getCategories())
        dispatch(getAllProducts())
        dispatch(getAllUsers())
    },[dispatch])


    return(
        <div>
            <header>
                <h1 className={style.header}>Admin Page</h1>
            </header>
            <Link to="/">
                <button className={style.backBtn}p>Go Back</button>
            </Link>
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
                    <button className={style.mybtn } onClick={handleModal}>Create category</button>
                <CategoriesSB categories={categories} categoryName={categoryName} category={category} 
                setCategoryName={setCategoryName} setCategory={setCategory} setModalB={setModalB}/>
                </div>
                <Banner setIsOpen={setModalB} isOpen={modalB}>
                    <CategoryAdmin category={category[0]} setModalB={setModalB} setCategory={setCategory}/>
                </Banner>
                <div className={style.box}>
                    <h2>Products</h2>
                    <Link to='/admin/productAdmin'>
                        <button className={style.mybtn}>Create product</button>
                    </Link>
                    <ProductsSB products={products} productName={productName} 
                    product={product} setProductName={setProductName} setProduct={setProduct}/>
                </div>
            </div>
        </div>
    )
}