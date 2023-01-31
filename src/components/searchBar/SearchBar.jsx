import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Hint } from 'react-autocomplete-hint'
import { getAllProducts, getProductByName } from "../../redux/actions/products";
import style from './SearchBar.module.css'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function SearchBar(){
    const allProducts = useSelector((state) => state.products.products)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [auto, setAuto] = useState([])
    
    function handleInputChange(e){
        //e.preventDefault()
        setName(e.target.value)
        setAuto(allProducts?.map(p=>{
            return {
                label: p.name
            }
        }))
        //console.log(e.target.value)
        dispatch(getProductByName(e.target.value))

    }

    function handleSearch(e){
        e.preventDefault()
        if(name){
            setAuto(oldState=>({
                ...oldState,
                search: name
            }))
            navigate('/')
            dispatch(getProductByName(name))
        }else{
            toast.warning("'Enter a name to search!", {
                position: toast.POSITION.TOP_RIGHT
            });
        };
        setName('')
    };
    
    return(
        <div className={style.search} >
            <Hint options={Array.isArray(allProducts)?allProducts.map(p=>p.name):[]}>
                <input className={style.inpSearch} 
                    type="search" 
                    value={name}
                    placeholder="Search" 
                    label="Search" 
                    onChange={handleInputChange}
                />
            </Hint>   
            <button className={style.btn} type="submit" onClick={e => handleSearch(e)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
            </button>
        </div>
    )
}