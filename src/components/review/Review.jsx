import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../../redux/actions/products";
import style from './review.module.css'
import { toast } from "react-toastify";
import NavBar from "../navBar/NavBar";
import Footer from "../Footer/Footer";

let validate = (input) => {
    let errors = {};

    if (!input.title || input.title.length > 100) {
        if (!input.title) {
            errors.title = "Title cannot be null."
        }
        if (input.title.length > 100) {
            errors.title = "Maximum 100 characters."
        }
    }
    if (!input.description || input.description.length > 500) {
        if (!input.descriptio) {
            errors.description = "Description cannot be null."
        }
        if (input.description.length > 500) {
            errors.description = "Maximum 500 characters."
        }
    }
    if (!input.points || input.points < 0 || input.points > 5) {
        if (!input.points) {
            errors.points = "Rating cannot be null."
        }
        if (input.points < 0 || input.points > 5) {
            errors.points = "The rating must go from 0 to 5."
        }
    }
    return errors;
}

export default function Review() {
    const dispatch = useDispatch();
    const review = useSelector((state) => state.products.review)
    // const user = useSelector((state) => state.users)
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
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
        setErrors(validate(input));
        e.preventDefault();
        if (Object.keys(errors).length === 0 && input.title && input.description && input.points) {
            if (Array.isArray(review)) {
                if (review.length) {
                    alert("This product already has a review added.")
                }
            } else {
                dispatch(createReview(review, input))
                    .then(r => {
                        if (!r) {
                            toast.success("Product reviewed!", {
                                position: toast.POSITION.BOTTOM_RIGHT
                            });
                            navigate("/")
                        }
                    })
            }
        } else {
            toast.warning("Check the fields.", {
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
                    {!errors.title ? null : <p className={style.err}>{errors.title}</p>}

                    <div><label>Description: </label></div>
                    <textarea rows={3} cols={30}
                        type={"text"}
                        name={"description"}
                        value={input.description}
                        onChange={e => handleChange(e)}
                        className={style.inputReview}
                    />
                    {!errors.description ? null : <p className={style.err}>{errors.description}</p>}

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
                    {!errors.points ? null : <p className={style.err}>{errors.points}</p>}

                    <div className={style.btnContainer}>
                        <button type="submit" className={style.btnAdmin}>CREATE REVIEW</button>
                    </div>
                </div>
            </form>
            <Footer />
        </div>
    )
} 