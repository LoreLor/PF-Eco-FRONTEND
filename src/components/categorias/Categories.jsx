import React from "react"

import style from './Categories.module.css'

export default function Categories({categories}){
    function handleChangeCategories (e){
        e.preventDefault();
        alert(e.target.value)
    }
    return(
        <select onChange={e => handleChangeCategories(e)} className={style.select}>
            {
                // console.log(categories)&&
                categories?.map(cat => {
                        return(
                            <option name= 'categories' key={cat.name} value={cat.name}>{cat.name}</option>
                        )
                    })
            }
        </select>
    )
}