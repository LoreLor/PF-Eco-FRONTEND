import React, {useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { getAllProducts } from "../../redux/actions/products"
import { getCategories } from "../../redux/actions/categories"


import NavBar from '../navBar/NavBar'
import ProductCard from '../Productos/ProductCard'
import Loader from "../Loading/Loader"

import style from './Home.module.css'

export default function Home (){

    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products)
    const allCategories = useSelector((state) => state.products.categoriesDb)

    useEffect(() => {
        dispatch(getAllProducts());
        dispatch(getCategories())
        //console.log(allProducts)
        //console.log(allCategories)
    }, [dispatch])

    //mantener un boton que lleve a la pagina de admin
    //ProductCard ---> (name, img, price, rating)
    return(
        <div>
            <NavBar categories={allCategories}/>
            <Link to='/admin'> Ir a Admin</Link>
            <div className={style.cards}>
                {
                    allProducts.products ? 
                        allProducts.products.map(p => {
                            return(
                                <Link to={`/home/${p.id}`}>
                                    <ProductCard
                                        key={p.id}
                                        name={p.name}
                                        price={p.price}
                                        img={p.img}
                                        rating={p.rating}
                                    />
                                </Link>
                            )
                        }):
                        <Loader/>
                }
            </div>
        </div>
    )
}