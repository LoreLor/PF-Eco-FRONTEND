import React from "react"
import style from './searchBar.module.css'

export default function SearchBar ({result,setResult,placeholder}){

    function handleSearch (e){
        e.preventDefault()
        setResult(e.target.value)
    }
    return(
        <div className={style.subBox}>
            <input type="search" value={result} onChange={handleSearch} placeholder={placeholder} className={style.inputAdmin}/>
        </div>
    )
}