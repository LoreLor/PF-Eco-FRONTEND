import { Box } from "@mui/material";
import React, { useState } from "react";

import style from './Pages.module.css'

export default function Pages({productPerPg, allProducts, paginado, currentPg, setCurrentPg}){
    
    const pageNumbers = []

    const [pageNumberLimit, setPageNumberLimit ] = useState(3)//renderizo tres botones de pagina
    const [minPageLimit, setMinPageLimit ] = useState(0) //minima pagina renderizada
    const [maxPageLimit, setMaxPageLimit] = useState(3)// maxima pagina render

    for(let i = 1; i <= Math.ceil(allProducts/productPerPg); i++){
        pageNumbers.push(i)
    }
    //console.log(pageNumbers.map())

    const renderPage  = pageNumbers.map((number) => {
        if(number < maxPageLimit+1 && number > minPageLimit){
            return(
                <li className={style.number} key={number} >
                    <button className={currentPg === number? style.linkActive : style.link} href="/#" onClick={() => paginado(number)} >{number}</button>
                </li>
            )
        }else{
            return null
        }
    })
    const handlePrev = (e) => {
        //console.log('prev')
        setCurrentPg(currentPg - 1)
        if((currentPg - 1) % pageNumberLimit === 0){
            setMaxPageLimit(maxPageLimit - pageNumberLimit)
            setMinPageLimit(minPageLimit - pageNumberLimit)
        }
    }
    
    const handleNext = (e) => {
        //console.log('next')
        setCurrentPg(currentPg+1)
        if(currentPg + 1 > maxPageLimit){
            setMaxPageLimit(maxPageLimit + pageNumberLimit)
            setMinPageLimit(minPageLimit + pageNumberLimit)
        }
    }

    return(   
        <Box
            sx={{
                margin: "20px 0px"
            }}
        >
            <ul className={style.paginas}>
                <li>
                    <button onClick={(e) => {handlePrev(e)}} className={style.btnPages} disabled={currentPg === pageNumbers[0]} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                        </svg>
                    </button>
                </li>                
                { 
                    pageNumbers && 
                        renderPage
                }
                <li>
                    <button onClick={(e) => {handleNext(e)}} disabled={currentPg === pageNumbers.length} className={style.btnPages}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                        </svg>
                    </button>
                </li>
            </ul>
        </Box>
    )
}