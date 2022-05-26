import { useState } from "react"
import style from './ProductAdmin.module.css'

export default function ProductPictures({input,setInput}){
    
    const [current,setCurrent] =useState(0)
    const img = input.img
    const length = img.length
    const pages = []
    for (let i = 0; i <= length - 1; i++) {
        pages.push(i)}

        function currentPage(e){
            e.preventDefault()
            setCurrent(parseInt(e.target.value))
        }

        function changeArray(e){
            e.preventDefault()
            if(length > 1){
                setInput({
                    ...input,
                    [e.target.name]:input[e.target.name].filter(item => item !== e.target.value)
                })
                setCurrent(Math.floor(length/2))
            }
        }

    return(
        <>
            <div className={style.imgZone}>
            <div className={style.imgDiv}>
            <img className={style.img} src={img[current]} alt="..."/>
            <button className={style.delbtn} name="img" value={img[current]} onClick={changeArray}>Delete</button>
            </div>
            <div className={style.imgbtn}>
                    {pages.length > 0 ? pages.map((page)=>(
                    
                    <button
                        key={page}
                        value={page}
                        onClick={currentPage}
                        className={page === current? style.pageActive : style.page}
                        
                        >
                            {page +1}
                    </button>
                   
                )):<></>}
                 </div>
               </div> 
        </>
    )
}