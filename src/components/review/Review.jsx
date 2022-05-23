import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createReview } from "../../redux/actions/products";


export default function Review({id}) {
    const dispatch = useDispatch();
    // const shopping = useSelector((state) => state.products.shopping)
    // const user = useSelector((state) => state.users)
    const navigate = useNavigate();

    const [input, setInput] = useState({
        title: "",
        description: "",
        points: ""
    })

    let handleChange = (e) => {
        e.preventDefault();
        setInput((prevInput) => {
            const newInput = {
                ...prevInput,
                [e.target.name]: e.target.value,
            }
            return newInput;
        })
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        if (/* Object.keys(errors).length === 0 && */ input.title && input.description && input.points) {
            dispatch(createReview(id,input))
            .then(r => {
                if(!r){
                    alert("Review added.")
                    navigate("/")
                } else {
                    alert("This product already has a review added.")
                }
            })
            
        } else {
            alert("Complete all the fields. Fields cannot be null.")
        }
    }

    return (
        <div>
            {/* <div>
                <NavBar />
            </div> */}
            <form onSubmit={handleSubmit}>
                <div><label>Title: </label></div>
                <input
                    type={"text"}
                    name={"title"}
                    value={input.title}
                    onChange={e => handleChange(e)}
                ></input>
                <div><label>Description: </label></div>
                <input
                    type={"text"}
                    name={"description"}
                    value={input.description}
                    onChange={e => handleChange(e)}
                ></input>
                <div><label>Points: </label></div>
                <input
                    type={"number"}
                    name={"points"}
                    value={input.points}
                    min={0}
                    max={5}
                    onChange={e => handleChange(e)}
                ></input>

            <br></br>
            <br></br>

                <div>
                    <button type="submit" >CREATE REVIEW</button>
                </div>
            </form>
        </div>
    )
} 