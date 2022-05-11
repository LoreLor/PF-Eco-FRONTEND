import React from "react";
import SearchBar from "../searchBar/SearchBar";
import Categories from "../categorias/Categories";

export default function NavBar({categories}){


    function handleCart(e){
        e.preventDefault()
        alert('carrito')
    }

    return(
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">

            <div className="container-fluid">

                <a className="navbar-brand" href="#">Titulo del Ecommerce</a>

                <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="navbar-collapse collapse" id="navbar" style={{justifyContent:'flex-end'}}>
                    <Categories categories={categories}/>
                    <button className="btn btn-secundary" type="button" style={{marginRight:'10px'}} onClick={e => handleCart(e)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-cart-check" viewBox="0 0 16 16">
                            <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                        </svg>
                    </button>
                    <SearchBar/>
                    <a type="button" haref='#' className="btn btn-secondary">LogIn</a>
                </div>
            </div>
        </nav>
    )
}