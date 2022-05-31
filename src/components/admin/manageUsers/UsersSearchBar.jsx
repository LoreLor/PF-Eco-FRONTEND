import React from "react"
import style from '../adminPage/searchBars/searchBars.module.css'

export default function UserSB ({result,setResult}){

    
    function handleSearch (e){
        e.preventDefault()
        setResult(e.target.value)
    }

    return(
        <div className={style.subBox}>
                    <input type="search" value={result} onChange={handleSearch} placeholder="Search by name..." className={style.inputAdmin}/>
                <div>

        </div>
        </div>
    )
}