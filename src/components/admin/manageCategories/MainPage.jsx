import NavBarAdmin from "../adminPage/navBarAdmin/NavBarAdmin"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../Footer/Footer";
import style from './Table_Main.module.css'
import { getCategories } from "../../../redux/actions/categories";
import MainTable from './MainTable'
import EditCategory from "./EditCategory"
import SearchBar from "../adminPage/searchBar/SearchBar"

export default function MainPage (){
    const categories = useSelector((state)=> state.products.categoriesDb)

    const dispatch = useDispatch()

    const [result,setResult] = useState("")
    const [categoryEdit,setCategoryEdit] = useState([])

    const searchResult = result ? categories.filter((category)=> category.name.toLowerCase().includes(result.toLowerCase())) : ""
    const array = !result ? categories : searchResult

    useEffect(()=>{
        dispatch(getCategories())
    },[dispatch])

    return(
        <div>
            <NavBarAdmin/>
        <div className={style.caja}>
            <div className={style.content}>
                <div className={style.searchBar}>
                    <SearchBar result={result} setResult={setResult} placeholder={"Search by name..."}/>
                    <EditCategory category={categoryEdit[0]} categories ={categories} setCategoryEdit={setCategoryEdit}/>
                </div>
                <div className={style.categoriesList}>
                    <MainTable array={array} setEdit={setCategoryEdit} />
                </div>
            </div>
        </div>
        <br></br>
            <Footer/>
        </div>
    )
}