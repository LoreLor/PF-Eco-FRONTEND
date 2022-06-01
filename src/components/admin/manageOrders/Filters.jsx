import React from "react"
import style from './Filters.module.css'

export default function Filters ({filter,setFilter}){
    
    function onChangeFilter(e){
        e.preventDefault()
        setFilter({
            ...filter,
            "filter": e.target.value
        })
    }

    function onChangeOrder(e){
        e.preventDefault()
        setFilter({
            ...filter,
            "order": e.target.value
        })
    }
    
    return (
        <>
        <span id={style.span}>Filter:</span>       
        <select className={style.select} onChange={onChangeFilter}>
            <option  value="All">All</option>
            <option  value="shipped">Shipped</option>
            <option  value="delivered">Delivered</option>
            <option  value="returned">Returned</option>
        </select>
        <br></br>
        <span id={style.span}>Order by:</span>
        <select className={style.select} onChange={onChangeOrder}>
        <option  value="date">Date (Recent)</option>
        <option  value="date2">Date (Old)</option>
        </select>
        </>

    )
}