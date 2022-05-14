import React, { useState } from "react"
import { filterByPrice, getAllProducts } from "../../redux/actions/products";
import { useDispatch } from "react-redux";

import style from './FilterPrice.module.css'

export default function FilterPrice() {

    const dispatch = useDispatch();

    const [input, setInput] = useState({
        min: "$Min",
        max: "$Max",
    })


    function handleChange(e) {
        e.preventDefault();
        setInput((prevInput) => {
            const newInput = {
                ...prevInput,
                [e.target.name]: e.target.value,
            }
            return newInput;
        })
    }

    function handleSubmit (e) {
        e.preventDefault();
        if(input.min > 0 && input.max > 0) {
            dispatch(filterByPrice(input));
            setInput({
                min: "$Min",
                max: "$Max",
            })
        } else {
            alert("Numbers cannot be null or negative!")
        }
    }

    


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input className={style.input} type={"number"} name={"min"} value={input.min} onChange={e => handleChange(e)} placeholder="$Min."></input>
                <input className={style.input} type={"number"} name={"max"} value={input.max} onChange={e => handleChange(e)} placeholder="$Max."></input>
                <button type="submit">GO</button>
            </form>
        </div>

    )
}