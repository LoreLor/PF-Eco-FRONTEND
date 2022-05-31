import React, { useState } from "react"
import { filterByPrice, /* getAllProducts */} from "../../redux/actions/products";
import { useDispatch } from "react-redux";

import style from './FilterPrice.module.css'
import { toast } from "react-toastify";

export default function FilterPrice() {

    const dispatch = useDispatch();

    const [input, setInput] = useState({
        min: "",
        max: "",
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
        } else {
            toast.warning('Numbers cannot be null or negative!', {
                position: toast.POSITION.TOP_LEFT
            })
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input className={style.input} type={"number"} min={1} name={"min"} value={input.min} onChange={e => handleChange(e)} placeholder="$Min."></input>
                <input className={style.input} type={"number"} min={1} name={"max"} value={input.max} onChange={e => handleChange(e)} placeholder="$Max."></input>
                <button type="submit" className={style.mybtn}>GO</button>
            </form>
        </div>
    )
}