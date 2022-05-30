import React from "react"
import { getAllProducts, orderByPrice, orderByRating, orderByAlphabet } from "../../redux/actions/products";
import { useDispatch } from "react-redux";

import style from './Order.module.css'

export default function OrderPrice() {
    const dispatch = useDispatch();

    function handleOrderByPrice(e) {
        e.preventDefault();
        if(e.target.value === "asc" || e.target.value === "desc") {
            dispatch(orderByPrice(e.target.value));
        }
        if(e.target.value === "asc2" || e.target.value === "desc2") {
            dispatch(orderByRating(e.target.value));
        }
        if(e.target.value === "atoz" || e.target.value === "ztoa") {
            dispatch(orderByAlphabet(e.target.value));
        }
    }
    return (
        <select defaultValue="default" name="numerical" onChange={e => handleOrderByPrice(e)} className={style.select_Price}>
            <option value="default" disabled>Order</option>
            <option value="default" disabled>Order price</option>
            <option value="asc">Min to Max</option>
            <option value="desc">Max to Min</option>
            <option value="default" disabled>Order rating</option>
            <option value="asc2">Min to Max</option>
            <option value="desc2">Max to Min</option>
            <option value="default" disabled>Order alphabet</option>
            <option value="atoz">A to Z</option>
            <option value="ztoa">Z to A</option>
        </select>
    )
}