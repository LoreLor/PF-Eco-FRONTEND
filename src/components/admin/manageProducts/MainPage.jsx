import React,{useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllProducts } from "../../../redux/actions/products"
import NavBarAdmin from "../adminPage/navBarAdmin/NavBarAdmin"
import style from './Main.module.css'
import Footer from "../../Footer/Footer"
import MainTable from '../manageCategories/MainTable'
import SearchBar from "../adminPage/searchBar/SearchBar"
import EditProduct from "./EditProduct"
import { getCategories } from "../../../redux/actions/categories"

export default function MainPage(){
    const products = useSelector((state)=> state.products.products)
    const categories = useSelector((state)=> state.products.categoriesDb)

    const dispatch = useDispatch()

    const [result,setResult] = useState("")
    const [productEdit,setProductEdit] = useState([])

    const searchResult = result ? products.filter((product)=> product.name.toLowerCase().includes(result.toLowerCase())) : ""
    const array = !result ? products : searchResult

    useEffect(()=>{
        dispatch(getAllProducts())
        dispatch(getCategories())
    },[dispatch])

    return (
        <div className={style.center}>
            <div className={style.navBar}>
            <NavBarAdmin/>
            </div>
            <div className={style.caja}>
                <div className={style.content}>
                    <div className={style.searchBar}>  
                    <SearchBar result={result} setResult={setResult} placeholder={"Search by name..."}/>
                    <EditProduct product={productEdit[0]} products={products} categories={categories} setProductEdit={setProductEdit}/>
                    </div>
                    <div className={style.productsList}>
                    <MainTable array={array} setEdit={setProductEdit} />
                    </div>
                </div>
            </div>
            <div id={style.Footer}>
            <Footer/>
            </div>
        </div>
    )
}