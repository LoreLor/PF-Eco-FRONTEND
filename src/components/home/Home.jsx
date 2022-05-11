import React, {useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"

import { getAllProducts } from "../../redux/actions/products"

import { Link } from "react-router-dom"

import NavBar from '../navBar/NavBar'
import ProductCard from '../Productos/ProductCard'

import style from './Home.module.css'
import Loader from "../Loading/Loader"

export default function Home (){

    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products)

    useEffect(() => {
        dispatch(getAllProducts());
        //console.log(allProducts)
    }, [dispatch])

    //mantener un boton que lleve a la pagina de admin
    //ProductCard ---> (name, img, price, rating)
    return(
        <div>
            <NavBar/>
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