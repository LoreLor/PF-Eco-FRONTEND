import React, { useEffect } from 'react';
import { Link, NavLink, useLocation } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { userLogin } from "../../redux/actions/user"
import { useDispatch, useSelector } from "react-redux";
import s from "./Login.module.css";
import { useState } from 'react';
import Swal from "sweetalert2";
import imagen1 from '../../assets/celulares.jpg';
import imagen2 from '../../assets/celulares1.jpg';
import imagen3 from '../../assets/celulares3.jpg';
import LoginGoogle from './LoginGoogle';
import Footer from '../Footer/Footer';
import SERVER from '../../server';



const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const user = useSelector((state) => state.users);
   

//queryString de login...si true te lleva al home
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect')
    const redirect = redirectInUrl ? redirectInUrl : '/';
    

    useEffect(() => {
        if(user.user_name){
           navigate(redirect)
        }
    }, [navigate, user, redirect]);

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        dispatch(userLogin(email, password))
            .then(res => { 
                if(!res){
                    setEmail('')
                    setPassword('')
                    
                } else {
                    Swal.fire({
                        title: 'login success',
                        icon: 'success'
                    })
                    navigate(redirect)
                }
            }
        )
       
    }
    

    return (
        <div style={{ marginBottom: 40 }} >
            <div class="py-5 text-center">
            <h2 className={s.title}>
              Sign In{" "}
              <div>
           
                <NavLink to="/" className={s.titulo} type="text"  data-bs-toggle="tooltip" data-bs-placement="top" title="GO HOME">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="currentColor"
                    className="bi bi-phone"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />
                    <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                  </svg>
                  City Cell
                </NavLink>
              </div>
            </h2>
          </div>
            <form onSubmit={(e)=>handleSubmitLogin(e)} autoComplete="off">
                <div className="container w-75 mt-5 shadow-lg p-3 mb-5 bg-white rounded">
                    <div className="row align-items-center align-items-center ">
                        <div class='col-lg-5'>
                            <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img class="d-block w-100" src={imagen1} alt="First slide" width="1010" height="400" />
                                    </div>
                                    <div class="carousel-item">
                                        <img class="d-block w-100" src={imagen2} alt="Second slide" width="1010" height="400" />
                                    </div>
                                    <div class="carousel-item">
                                        <img class="d-block w-100" src={imagen3} alt="Third slide" width="1010" height="400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col bg-white p-5 col-lg-7 col-xl-6 rounded-end">
                            <h2 className="fw-bold text-center pt-5 mb-5">Welcome</h2>
                            {/* Formulario de login */}
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label"> Email </label>
                                <input type="text"
                                    className="form-control mb-2"
                                    placeholder="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label"> Password </label>
                                <input type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required

                                />
                            </div>
                            <div className="d-grid">
                                <button type="submit" className={s.btn}> Sign In </button>
                            </div>
                             <div className="container w-100 my-5">
                                <div className="row my-3 text-center">
                                    <div className="col-12"> 
                                            <LoginGoogle />                            
                                    </div>                           
                                </div>
                            </div> 
                            <div className="row my-3 text-center">
                                <span> You don't have an account?  Go to...<strong><Link to={`/register?redirect=${redirect}`}>Create your account</Link></strong></span>
                            </div>  
                        </div>
                    </div>
                </div>
            </form>
            <Footer/> 
        </div>
    );
};

export default Login;
