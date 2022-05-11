import React from "react"
import { Link } from "react-router-dom"

export default function Home (){
    //mantener un boton que lleve a la pagina de admin
    return(
        <>
        <p>Pagina principal</p>
        <Link to='/admin'>
        Ir a Admin 
        </Link>
        </>
    )
}