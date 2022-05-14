import React, { useEffect } from "react"
import { filterByCategory, getAllProducts } from "../../redux/actions/products";
import { useDispatch } from "react-redux"

import style from './Categories.module.css'

export default function Categories({categories}){
    const dispatch = useDispatch();

    function handleChangeCategories (e){
        e.preventDefault();
        dispatch(filterByCategory(e.target.value));
    }
    return(
        <select onChange={e => handleChangeCategories(e)} className={style.select}>
            <option value="all">Filter category</option>
            {
                categories?.map(cat => {
                        return(
                            <option name= 'categories' key={cat.name} value={cat.name}>{cat.name}</option>
                        )
                    })
            }
        </select>
    )
}