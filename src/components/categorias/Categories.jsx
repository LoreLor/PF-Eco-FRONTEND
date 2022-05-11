import React from "react"


export default function Categories({categories}){
    function handleCahngeCategories (e){
        e.preventDefault();
        alert(e.target.value)
    }
    return(
        <select onChange={e => handleCahngeCategories(e)}>
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