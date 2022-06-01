import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPassword } from "../../redux/actions/user";
import Footer from "../Footer/Footer";
import style from './ForgotPass.module.css'

export default function ForgotPass(){
    
    const [email, setEmail] = useState()
    const dispatch =  useDispatch()
    const navigate = useNavigate()

    function handleSetEmail(e){
        e.preventDefault()
        setEmail(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(forgotPassword(email))
        navigate('/login')
        toast.success("Check your Email!", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }

    // console.log(email)
    return(
        <div className={style.box}>
            <div className={style.container}>
            <h1>Forgot password</h1>
            <form  id={style.formDiv}onSubmit={e => handleSubmit(e)}>
                <label for='email'>Email:</label>
                <input className={style.input_email} type='email' name='email' id='email' onChange={e => handleSetEmail(e)}/>
                <br/>
                <input className={style.mybtn} type='submit' />
            </form>
            </div>
            <Footer/>
        </div>
    )
}