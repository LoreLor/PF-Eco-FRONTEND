import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../../redux/actions/products";
import style from './review.module.css'
import { toast } from "react-toastify";
import NavBar from "../navBar/NavBar";
import Footer from "../Footer/Footer";

export default function Review() {
    const dispatch = useDispatch();
    const review = useSelector((state) => state.products.review)
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

            if(Array.isArray(review)) {
                if(review.length) {
                    alert("This product already has a review added.")
                }
            } else {
                dispatch(createReview(review,input))
                .then(r => {
                    if(!r){
                        toast.success("Product reviewed!", {
                            position: toast.POSITION.BOTTOM_RIGHT
                        });
                        navigate("/")
            }
        })
    }       
        } else {
            toast.warning("Complete all the fields. Fields cannot be null.", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }

    return (
        <div>
            <NavBar />
                <form onSubmit={handleSubmit} className={style.formReview}>
                    <div className={style.review}>
                        <div><label>Title: </label></div>
                        <input
                            type={"text"}
                            name={"title"}
                            value={input.title}
                            onChange={e => handleChange(e)}
                            className={style.inputReview}
                        />
                        <div><label>Description: </label></div>
                        <textarea rows={3} cols={30}
                            type={"text"}
                            name={"description"}
                            value={input.description}
                            onChange={e => handleChange(e)}
                            className={style.inputReview}
                        />
                        <div><label>Points: </label></div>
                        <input
                            type={"number"}
                            name={"points"}
                            value={input.points}
                            min={0}
                            max={5}
                            onChange={e => handleChange(e)}
                            className={style.inputReviewPoints}
                        />
                        <div className={style.btnContainer}>
                            <button type="submit" className={style.btnAdmin}>CREATE REVIEW</button>
                        </div>
                    </div>
                </form>
            <Footer/>
        </div>
    )
} 