import React from 'react'
import style from '../manageCategories/Table_Main.module.css'


export default function MainTable({array,setEdit}){

    function onEdit(e){
        e.preventDefault()
        setEdit(array.filter(element=> element.id === e.target.value ))
    }

    function partDate(e){
        return e.split("T")[0]
    }

    return (
        <div>
            {array && array.length > 0 ? array.map((element)=>{
                return(
                    <div key={element.id} className={element.sendStatus === "shipped" ? style.shipping : element.sendStatus === "delivered" ? style.delivered : element.sendStatus === "returned" ? style.box2 : style.box}>
                        <h3 className={style.title2}>{element.user.email}</h3>
                        <span className={style.idNum}>{partDate(element.date)}</span>
                        <button value={element.id} className={style.btnAdmin} onClick={onEdit}>Details</button>
                    </div>
                )
            }):
            <div>
            <h1 className={style.coincidences}>There is no coincidences</h1>
            </div>}

        </div>
    )
}