import React, {useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"

import { getAllProducts, getCart } from "../../redux/actions/products"
import { getCategories } from "../../redux/actions/categories"


import NavBar from '../navBar/NavBar'
import ProductCard from '../Productos/ProductCard'
import Loader from "../Loading/Loader"
import Pages from "../Pages/Pages"

import style from './Home.module.css'
import Footer from "../Footer/Footer"
import { Link } from "react-router-dom"


export default function Home (){

    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products)
    const allCategories = useSelector((state) => state.products.categoriesDb)

    const [order, setOrder] = useState('')
    const [currentPg, setCurrentPg] = useState(1);//seteo la pagina a renderizar
    const [productPerPg, setProductPerPg] = useState(12); //12 products por pagina

    const lastProduct = currentPg * productPerPg; //ultimo producto de la pagina renderizada
    const firstProduct = lastProduct - productPerPg;
    const currentProduct = allProducts.showedProducts.slice(firstProduct, lastProduct)//products renderizados por pagina

    const paginado = (pgNumber) => {
        setCurrentPg(pgNumber)
    }
    const users = JSON.parse(localStorage.getItem('userInfo'))

    
    useEffect(() => {
        dispatch(getAllProducts());
        dispatch(getCategories());
        //dispatch(getCart(user.id));
        //console.log(cart)
        //console.log(allProducts)
        //console.log(allCategories)
    }, [])

    //ProductCard ---> (name, img, price, rating)
    return(
        <div>
            <NavBar categories={allCategories}/>
            
            <div className={style.cards}>
                {
                    currentProduct ? 
                        currentProduct.map(p => {
                            if (p.stock === 0) return;
                            return(
                                    <ProductCard
                                        id={p.id}
                                        key={p.id}
                                        name={p.name}
                                        price={p.price}
                                        img={p.img}
                                        rating={p.rating}
                                    />
                            )
                        }):
                        <Loader/>
                }
            </div>
            <Pages
                productPerPg = {productPerPg}
                allProducts = {allProducts.showedProducts.length}
                paginado= {paginado}
                currentPg = {currentPg}
                setCurrentPg= {setCurrentPg}
            />
            <Footer/>
        </div>
    )
}