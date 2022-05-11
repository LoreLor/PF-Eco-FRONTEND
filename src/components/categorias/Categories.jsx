import React from "react"


export default function Categories({categories}){
    
    return(
        <select>
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