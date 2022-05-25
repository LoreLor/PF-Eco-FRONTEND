import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./Register.module.css";
import imagen1 from "../../assets/celulares4.jpg";
import activeValidator from './validators/activeValidations'
import submitValidator from './validators/submitValidations'
import axios from "axios";
import AlertModal from '../admin/AdminModals/AlertModal'
import Footer from "../Footer/Footer";
import SERVER from "../../server";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const [isOpen,setIsOpen]= useState(false)
  const [keyword,setKeyword]= useState("")

  const handleChange = (e) => {
    setErrors(
      activeValidator({
        ...user,
        [e.target.name]: e.target.value,
      })
    );
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(submitValidator(user))
    if (Object.keys(errors).length === 0 
    && user.name !== ""
    && user.last_name !== ""
    && user.user_name !== ""
    && user.email !==""
    && user.password !=="") {
      let response = null
      try {
        response = await axios.post(`${SERVER}/user`,user) //no entiendo para que se hace esto aca si esta en redux
        const result = response.data
        setKeyword(result.msg)
        if(!isOpen && result.msg === "User registered"){
          setIsOpen(true);
          setUser({
            name: "",
            last_name: "",
            user_name: "",
            email: "",
            password: "",
          });
        }else{
          setIsOpen(true)
        }
      } catch (error) {
        console.log(error)
      }
    } 
  };

  return (
    <>
      <div className={s.contenedor}>
        <div class="container">
          <form
            class="needs-validation"
            onSubmit={handleSubmit}
            autocomplete="off"
          >
            <div class="py-5 text-center">
              <h1 class="fw-bold text-center pt-5 mb-5 " className={s.titulo}>
                Welcome: Create Account
              </h1>
            </div>
            <div class="container w-75  shadow-lg p-3 mb-5 bg-white rounded">
              <div class="row align-items-center align-items-center ">
                <div class="col-lg-5">
                  <figure class="figure">
                    <img
                      src={imagen1}
                      class="figure-img img-fluid rounded"
                      alt="..."
                    />
                    <figcaption class="figure-caption"></figcaption>
                  </figure>
                </div>
                <div class="col bg-white p-3 col-lg-7 col-xl-6 rounded-end">
                  <p className={s.subtitulo}>
                    Please complete the fields to use our services
                  </p>

                  {/* Formulario de Register */}
                  <div class="mb-3">
                    <label
                      htmlFor="validationCustom03"
                      class="form-label"
                      className={s.label}
                    >
                      <strong>Name:</strong>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      class="form-control"
                      aria-describedby="Insert your name"
                      placeholder="Insert your name..."
                      onChange={handleChange}
                    />
                  </div>
                  {errors.name && <p class="text-danger">{errors.name}</p>}

                  <div class="mb-3">
                    <label
                      htmlFor="validationCustom03"
                      class="form-label"
                      className={s.label}
                    >
                      <strong>Last_Name: </strong>
                    </label>
                    <input
                      id="last_name"
                      name="last_name"
                      type="text"
                      class="form-control"
                      aria-describedby="Insert your last_name"
                      placeholder="Insert your last name..."
                      onChange={handleChange}
                    />
                    {errors.last_name && (
                      <p class="text-danger">{errors.last_name}</p>
                    )}
                  </div>
                  <div class="mb-3">
                    <label
                      htmlFor="validationCustom03"
                      class="form-label"
                      className={s.label}
                    >
                      <strong>Email:</strong>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      class="form-control"
                      aria-describedby="Insert your email"
                      placeholder="Insert your email... example@mail.com"
                      onChange={handleChange}
                    />
                    {errors.email && <p class="text-danger">{errors.email}</p>}
                  </div>

                  <div class="mb-3">
                    <label
                      htmlFor="validationCustom03"
                      class="form-label"
                      className={s.label}
                    >
                      <strong>User Name: </strong>
                    </label>
                    <input
                      id="user_name"
                      name="user_name"
                      type="text"
                      class="form-control"
                      aria-describedby="Insert your user_name"
                      placeholder="Insert a username..."
                      onChange={handleChange}
                    />
                  </div>
                  {errors.user_name && (
                    <p class="text-danger">{errors.user_name}</p>
                  )}

                  <div class="mb-3">
                    <label
                      htmlFor="validationCustom03"
                      class="form-label"
                      className={s.label}
                    >
                      <strong>Password: </strong>
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      class="form-control"
                      aria-describedby="Insert your name"
                      placeholder="Insert your password min 8 characters ..."
                      onChange={handleChange}
                    />
                  </div>
                  {errors.password && (
                    <p class="text-danger">{errors.password}</p>
                  )}

                  <div class="mb-3">
                    <label
                      htmlFor="validationCustom03"
                      class="form-label"
                      className={s.label}
                    >
                      <strong>Profile Image: </strong>
                    </label>
                    <input
                      id="img"
                      name="img"
                      class="form-control"
                      type="file"
                      placeholder="Add your avatar"
                      onChange={handleChange}
                    />
                  </div>
                  {errors.img && <p class="text-danger">{errors.img}</p>}

                  <div className="d-grid">
                  {Object.keys(errors).length === 0 && Object.keys(user).length > 0 && 
                    <button type="submit" class={s.btn}>
                      SUBMIT
                    </button>
                  }
                  </div>
                </div>
              </div>
            </div>
          </form>
          <AlertModal isOpen={isOpen} setIsOpen={setIsOpen}>
          {keyword.length ? (
                    <>
                    <h2>{keyword}</h2>
                    {keyword === "User registered" ? (
                        <button onClick={()=> navigate("/login",{replace:true})} className={s.btn}> 
                            Go to Login
                        </button>
                    ): (
                        <button onClick={()=> setIsOpen(state=>!state)} className={s.btn}>Ok</button>
                    )}
                    </>
                ):(
                    <h2>Invalid Data</h2>
                )}
          </AlertModal>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Register;
