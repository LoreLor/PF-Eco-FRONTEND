import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { clearStatesProducts, getAllProducts, getCart, getFavs } from "../../redux/actions/products";
import { getCategories } from "../../redux/actions/categories";


import NavBar from '../navBar/NavBar';
import ProductCard from '../Productos/ProductCard';
import Loader from "../Loading/Loader";
import Pages from "../Pages/Pages";

import style from './Home.module.css';
import Footer from "../Footer/Footer";



export default function Home() {

    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products);
    const allCategories = useSelector((state) => state.products.categoriesDb);
    const fav = useSelector((state) => state.products.favs);

    const [order, setOrder] = useState('');
    const [currentPg, setCurrentPg] = useState(1); //setea la pagina en 1
    const [productPerPg, setProductPerPg] = useState(12);

    const lastProduct = currentPg * productPerPg;
    const firstProduct = lastProduct - productPerPg;
    const currentProduct = allProducts.showedProducts.slice(firstProduct, lastProduct);

    const paginado = (pgNumber) => {
        setCurrentPg(pgNumber)
    }
    const users = useSelector((state) => state.users.userInfo)

    let isFaved = false

    useEffect(() => {
        dispatch(getAllProducts());
        dispatch(getCategories());
        dispatch(clearStatesProducts());
        if (users && users.id) {
            dispatch(getFavs(users.id))
        }
    }, [dispatch])

    //ProductCard ---> (name, img, price, rating)
    return (
        <div>
            <NavBar categories={allCategories} paginado={paginado} />

            <div className={style.cards}>
                {
                    currentProduct ?
                        currentProduct.map(p => {
                            if (p.stock && p.isActive) {
                                isFaved = fav.some(item => item.id === p.id)
                                return (
                                    <ProductCard
                                        id={p.id}
                                        key={p.id}
                                        name={p.name}
                                        price={p.price}
                                        img={p.img}
                                        rating={p.rating}
                                        isFaved={isFaved}
                                    />
                                )
                            }
                        }) :
                        <Loader />
                }
            </div>
            <Pages
                productPerPg={productPerPg}
                allProducts={allProducts.showedProducts.length}
                paginado={paginado}
                currentPg={currentPg}
                setCurrentPg={setCurrentPg}
            />
            <Footer />
        </div>
    )
}