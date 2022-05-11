import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"

import { getProductByName } from "../../redux/actions/products";

export default function SearchBar(){
    
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState('');
    
    function hanldeInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        //console.log(e.target.value)
    }

    function handleSearch(e){
        e.preventDefault()
        history.push('/home')
        dispatch(getProductByName(name))
    }

    return(
        <form className="d-flex" onSubmit={e => handleSearch(e)}>
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={e => hanldeInputChange(e)}/>
            <button className="btn btn-dark" type="submit"  
                onKeyPress={(e => {
                    if(e.key === 'Enter'){
                        dispatch(getProductByName(name))
                        history.push('/home')
                    }    
                })}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
            </button>
        </form>
    )
}