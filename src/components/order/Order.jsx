import React from "react"
import { getAllProducts, orderByPrice, orderByRating, orderByAlphabet } from "../../redux/actions/products";
import { useDispatch, useSelector } from "react-redux";

import style from './Order.module.css'

export default function OrderPrice() {
    const dispatch = useDispatch();
    const stateFilter = useSelector(s => s.products.stateFilter)

    function handleOrderByPrice(e) {
        e.preventDefault();
        if(e.target.value === "Min to Max price" || e.target.value === "Max to Min price") {
            dispatch(orderByPrice(e.target.value));
        }
        if(e.target.value === "Min to Max rating" || e.target.value === "Max to Min rating") {
            dispatch(orderByRating(e.target.value));
        }
        if(e.target.value === "A to Z" || e.target.value === "Z to A") {
            dispatch(orderByAlphabet(e.target.value));
        }
    }
    return (
        <select defaultValue="default" name="numerical" onChange={e => handleOrderByPrice(e)} className={style.select_Price}>
            
            {
            stateFilter.orderByPrice !== "" &&
            stateFilter.orderByRating !== "" &&
            stateFilter.orderByAlphabet !== "" ?
            <option value="default" disabled>Order</option> :
            stateFilter.orderByPrice !== "" ? 
            <option value="default" disabled>{stateFilter.orderByPrice}</option> :
            stateFilter.orderByRating !== "" ? 
            <option value="default" disabled>{stateFilter.orderByRating}</option> :
            stateFilter.orderByAlphabet !== "" ? 
            <option value="default" disabled>{stateFilter.orderByAlphabet}</option> :
            <option value="default" disabled>Order</option> 
            }

            <option value="default" disabled>Order price</option>
            <option value="Min to Max price">Min to Max</option>
            <option value="Max to Min price">Max to Min</option>
            <option value="default" disabled>Order rating</option>
            <option value="Min to Max rating">Min to Max</option>
            <option value="Max to Min rating">Max to Min</option>
            <option value="default" disabled>Order alphabet</option>
            <option value="A to Z">A to Z</option>
            <option value="Z to A">Z to A</option>
        </select>
    )
}