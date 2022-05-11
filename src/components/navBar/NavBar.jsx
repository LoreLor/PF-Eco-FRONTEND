import React from "react";
import SearchBar from "../searchBar/SearchBar";

export default function NavBar(){


    function handleCart(e){
        e.preventDefault()
        alert('carrito')
    }

    return(
        <nav class="navbar navbar-expand-sm navbar-dark bg-dark">

            <div class="container-fluid">

                <a class="navbar-brand" href="#">Titulo del Ecommerce</a>

                <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="navbar-collapse collapse" id="navbar" style={{justifyContent:'flex-end'}}>
                    <button class="btn btn-secundary" type="button" style={{marginRight:'10px'}} onClick={e => handleCart(e)}>
                        <svg xmlns="" width="30" height="30" fill="white" class="bi bi-cart-check" viewBox="0 0 16 16">
                            <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                        </svg>
                    </button>
                    <SearchBar/>
                    <a type="button" haref='#' class="btn btn-secondary">LogIn</a>
                </div>
            </div>
        </nav>
    )
}