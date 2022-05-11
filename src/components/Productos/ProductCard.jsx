import React from "react";
import { Rating } from "@mui/material";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import style from './ProductCard.module.css'

export default function ProductCard({name, img, price, rating, id}){


    return(
        <div className="col-lg-11">
            <div className="card text-white bg-dark mb-3">
                <Link to={`/home/${id}`}>
                    <img src={img} className="card-img-top" alt="404"/>
                </Link>
                <div className="card-body">
                    <div className={style.algo}>
                        <Typography component="legend" >{name}</Typography>
                        <Typography component="legend" style={{width:'40%'}}>$ {price}</Typography>
                    </div>
                    
                        <div className={style.btnRat}>
                            <button className="btn btn-secondary" style={{width: "3rem",height:'2rem', padding:'0', display:'flex', justifyContent:'center', alignItems: 'center'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                </svg>
                            </button>
                            <Rating name="read-only" value={rating} readOnly/>
                        </div>
                </div>
            </div>
        </div>
    )
}