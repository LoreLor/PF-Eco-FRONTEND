import React from "react"
import style from './searchBar.module.css'

export default function SearchBar ({result,setResult}){

    function handleSearch (e){
        e.preventDefault()
        setResult(e.target.value)
    }
    return(
        <div className={style.subBox}>
            <input type="search" value={result} onChange={handleSearch} placeholder="Search by name..." className={style.inputAdmin}/>
        </div>
    )
}