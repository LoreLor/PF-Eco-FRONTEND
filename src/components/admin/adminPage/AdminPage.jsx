import { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { getCategories } from '../../../redux/actions/categories'
import { getAllProducts } from '../../../redux/actions/products'
import { getAllUsers } from '../../../redux/actions/user'
import CategoriesSB from './searchBars/categoriesSB'
import ProductsSB from './searchBars/productsSB'
import UserSB from './searchBars/userSB'
import style from './AdminPage.module.css'
import BetaModal from '../AdminModals/BetaModal'
import FormModal from '../AdminModals/FormModal'
import UserAdmin from '../userAdmin/UserAdmin'
import CategoryAdmin from "../categoryForm/CategoryAdmin"
import ProductAdmin from "../productForm/ProductAdmin"
import NavBarAdmin from './navBarAdmin/NavBarAdmin'
import Footer from '../../Footer/Footer'

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
    const [modalC,setModalC] = useState(false)
    
    function handleModalB(e){
        e.preventDefault()
        setCategory("")
        setModalB(true)
    }

    function handleModalC(e){
        e.preventDefault()
        setProduct("")
        setModalC(true)
    }

    useEffect(()=>{
        dispatch(getCategories())
        dispatch(getAllProducts())
        dispatch(getAllUsers())
    },[dispatch])


    return(
        <div className={style.admin_container}>
            <NavBarAdmin/>
            <div className={style.adminPage}>

                <div className={style.box}>
                    <h2>Users</h2> 
                    <UserSB users={users} userName={userName} user={user} setUserName={setUserName} 
                    setUser={setUser} setModalA={setModalA}/>
                </div>

                <BetaModal setIsOpen={setModalA} isOpen={modalA} resetData={setUser}>
                    <UserAdmin user={user[0]} setModalA= {setModalA} setUser={setUser}/>
                </BetaModal>

                <div className={style.box}>
                    <h2>Categories</h2>
                    <button className={style.btnAdmin} onClick={handleModalB}>Create category</button>
                    <CategoriesSB categories={categories} categoryName={categoryName} category={category} 
                    setCategoryName={setCategoryName} setCategory={setCategory} setModalB={setModalB}/>
                </div>

                <BetaModal setIsOpen={setModalB} isOpen={modalB} resetData={setCategory}>
                    <CategoryAdmin category={category[0]} setModalB={setModalB} setCategory={setCategory}/>
                </BetaModal>

                <div className={style.box}>
                    <h2>Products</h2>
                    <button className={style.btnAdmin} onClick={handleModalC}>Create product</button>
                    <ProductsSB products={products} productName={productName} 
                    product={product} setProductName={setProductName} setProduct={setProduct} setModalC={setModalC}/>
                </div>

                <FormModal setIsOpen={setModalC} isOpen={modalC} resetData={setProduct}>
                    <ProductAdmin product={product[0]} setModalC={setModalC} setProduct={setProduct}/>
                </FormModal>
            </div>
            <Footer/>
        </div>
    )
}