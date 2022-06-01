import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPaidOrders } from "../../../redux/actions/products"
import NavBarAdmin from "../adminPage/navBarAdmin/NavBarAdmin"
import style from './Main.module.css'
import UserTable from "./UserTable"
import SearchBar from "../adminPage/searchBar/SearchBar"
import Footer from "../../Footer/Footer"

export default function MainPage(){
    const dispatch = useDispatch()
    const orders = useSelector((state)=>state.products.paidOrders)

    const [result,setResult] = useState("")
    const [productEdit,setProductEdit] = useState([])

    const searchResult = result ? orders.filter((order)=> order.user.email.toLowerCase().includes(result.toLowerCase())) : ""
    const array = !result ? orders : searchResult

    console.log(orders)
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
            <SearchBar result={result} setResult={setResult}/>

            </div>

            <div className={style.ordersList}>
                <UserTable array={array} setEdit={setProductEdit} />
            </div>
        </div>

        <div id={style.footer}>
                <Footer/>
            </div>
        </>
    )
}