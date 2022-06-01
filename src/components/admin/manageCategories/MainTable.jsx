import React from 'react'
import style from './Table_Main.module.css'


export default function MainTable({array,setEdit}){

    function onEdit(e){
        e.preventDefault()
        setEdit(array.filter(element=> element.id === e.target.value ))
    }

    return (
        <div>
            {array && array.length > 0 ? array.map((element)=>{
                return(
                    <div key={element.id} className={element && element.isActive === false ? style.box2:style.box}>
                        <h3 className={style.title}>{element && element.isActive === false ? `${element.name} (Inactive)`: element.name}</h3>
                        <button value={element.id} className={style.btnAdmin} onClick={onEdit}>Edit</button>
                    </div>
                )
            }):
            <div>
            <h1 className={style.coincidences}>There is no coincidences</h1>
            </div>}

        </div>
    )
}