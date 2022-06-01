import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPaidOrders } from "../../../redux/actions/products"
import NavBarAdmin from "../adminPage/navBarAdmin/NavBarAdmin"
import style from './Main.module.css'
import OrderTable from "./OrderTable"
import SearchBar from "../adminPage/searchBar/SearchBar"
import Footer from "../../Footer/Footer"
import Filters from "./Filters"
import EditOrder from './EditOrder'
import SortAndFilter from "./SortAndFilter"

export default function MainPage(){
    const dispatch = useDispatch()
    const orders = useSelector((state)=>state.products.paidOrders)

    const [result,setResult] = useState("")
    const [orderEdit,setOrderEdit] = useState([])
    const [filter,setFilter]= useState({
        filter:"All",
        order:"date"
    })
    console.log(orders)
    const searchResult = result ? orders.filter((order)=> order.user.email.toLowerCase().includes(result.toLowerCase())) : ""
    const Data = !result ? orders : searchResult
    const array = Data ? SortAndFilter(Data,filter) : null

    console.log(filter)
    useEffect(()=>{
        dispatch(getPaidOrders())
    },[dispatch])

    return(
        <>
        <div>
            <NavBarAdmin/>
        </div>

        <div className={style.content}>
        <div className={style.searchBar}>
            <SearchBar result={result} setResult={setResult} placeholder={"Search by email..."}/>
            <Filters filter={filter} setFilter={setFilter}/>
            <EditOrder order={orderEdit[0]} setOrderEdit={setOrderEdit}/>
            </div>

            <div className={style.ordersList}>
                <OrderTable array={array} setEdit={setOrderEdit} />
            </div>
        </div>

        <div id={style.footer}>
                <Footer/>
            </div>
        </>
    )
}