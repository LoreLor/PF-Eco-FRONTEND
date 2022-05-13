import React from 'react';
import axios from "axios";
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { googleLogin, userLogin  } from "../../redux/actions/user"
import { useDispatch, useSelector } from "react-redux";
import s from "./Login.module.css";
import { useState } from 'react';
import Swal from "sweetalert2";
import imagen1 from '../../assets/celulares.jpg';
import imagen2 from '../../assets/celulares1.jpg';
import imagen3 from '../../assets/celulares3.jpg';

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.user)

    const [email, setEmail] = useState("");
    const [password, setPassword]= useState("");

    
    const handleSubmitLogin = (e) => {
        e.preventDefault();
        dispatch(userLogin(email, password))
        setEmail('')
        setPassword('')   
            Swal.fire({
                title:'login success',
                icon: 'success'
            })
            navigate('/')
    }

/*para el seteo de contraseña*/
    const [mail, setMail]=useState('')
        const handleInputChangeMail = function (e) {
            setMail({
                ...mail,
                [e.target.name]: e.target.value
            });
        }
  
    const handleSubmitMail = async (e) => {
        e.preventDefault()
        await axios.post('/user', email).then(res => {
            Swal.fire("email enviado con exito!", {
                buttons: false,
                icon: "success",
                timer: 2000,
            });
        }).catch(err => {
            Swal.fire("Error, el usuario no existe!", {
                buttons: false,
                icon: "error",
                timer: 2000,
            });
        })
    }


    const handleGoogleLogin = async () => {
        //dispatch(googleLogin()).then(
        navigate('/')
        //)
        // window.location.reload()
    };

    return (
        <div style={{ marginBottom: 40 }} >
            <form  onSubmit={handleSubmitLogin} >
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
                        <div className="col bg- p-5 col-lg-7 col-xl-6 rounded-end">
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
                            {/* <div className="mb-4 form-check">
                                <input type="checkbox" className="form-check-input" name="connected" />
                                <label className="form-check-label" htmlFor="connected"> Keep Connection </label>
                            </div> */}
                            <div className="d-grid">
                                <button type="submit" className={s.btn}> Sign In </button>
                            </div>
                            <br />
                            <div className="col-md-4 col-lg-3 col-xl-12 mx-auto mb-md-0 mb-4">
                                <div className='d-grid'>
                                    <button
                                        type="button"
                                        className={s.btn}
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        data-bs-whatever="@igroup"
                                    >
                                       Forgot your Password?
                                    </button>
                                </div>
                                <div
                                    className="modal fade"
                                    id="exampleModal"
                                    tabIndex={-1}
                                    aria-labelledby="exampleModalLabel"
                                    aria-hidden="true"
                                >
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">
                                                    Enter your email to reset the password
                                                </h5>
                                                <button
                                                    type="button"
                                                    className="btn-close"
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close"
                                                />
                                            </div>
                                            <div className="modal-body">
                                                {/* <form> */}
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="recipient-name"
                                                        className="col-form-label"
                                                    >
                                                        Email:
                                                    </label>
                                                    <input
                                                        type="email"
                                                        value={email.email}
                                                        name="email"
                                                        onChange={handleInputChangeMail}
                                                        className="form-control"
                                                        id="recipient-name"
                                                    />
                                                </div>
                                                {/* </form> */}
                                            </div>
                                            <div className="modal-footer">
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    data-bs-dismiss="modal"
                                                >
                                                    Cerrar
                                                </button>
                                                <button type="submit"
                                                    value="Enviar Mail"
                                                    data-bs-dismiss="modal"
                                                    onClick={handleSubmitMail}
                                                    className="btn btn-success">
                                                    Send Email
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="my-3">
                                <span> You don't have an account? <Link to="/register">Register</Link></span>                             
                            </div>

                            {/* Login con google */}
                            <div className="container w-100 my-5">
                                <div className="row my-3 text-center">
                                    <div className="col-12"> Login with </div>
                                </div>
                                    <div className="row">
                                    <div className="col">
                                        <button className="btn btn-outline-ligth  my-1" type="button" onClick={handleGoogleLogin}>
                                            <div className="row align-items-center">

                                                <img src="https://i.postimg.cc/Y04ZG5n6/google.png" width="5%" alt='' />
                                        Google
                                            </div>

                                        </button>
                                </div>
                                    </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
