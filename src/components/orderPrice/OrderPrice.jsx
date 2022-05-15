import React from "react"
import { getAllProducts, orderByPrice } from "../../redux/actions/products";
import { useDispatch } from "react-redux";

import style from './OrderPrice.module.css'

export default function OrderPrice() {
    const dispatch = useDispatch();

    function handleOrderByPrice(e) {
        e.preventDefault();
        if(e.target.value === "default"){
            dispatch(getAllProducts())
        }
        dispatch(orderByPrice(e.target.value));
    }
    return (
        <div>
            <select name="numerical" onChange={e => handleOrderByPrice(e)} className={style.select}>
                <option value="default">Order price</option>
                <option value="asc">Min to Max</option>
                <option value="desc">Max to Min</option>
            </select>
        </div>

    )
}