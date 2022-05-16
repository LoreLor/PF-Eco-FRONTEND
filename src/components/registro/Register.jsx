import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './Register.module.css'
import imagen1 from '../../assets/celulares4.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { register, registerClear} from '../../redux/actions/user'



const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [user, setUser] = useState({
        name: "",
        last_name: "",
        user_name: "",
        email: "",
        password: "",
        dni: "",
        phone_number: "",
        address: "",
        rol: 'user',
        birthday: ""
    });
    const [errors, setErrors] = useState({});
    
    function registerValidate(){
        let errors={};
        if (user.name.length < 4) {
            errors.name = "you must enter a Name";
          } else if (/[^a-zA-Z ]/g.test(user.firstName)) {
            errors.name = "Only text";
          }
        if(!user.last_name){
            errors.last_name="you must enter a last_name"
        }
        if(!user.user_name){
            errors.user_name="you must enter a user name"
        }
        if(!user.email ){
            errors.email = "Email is required";
        }
        if (!user.password) {
           
            errors.password = "Should have 8 or more characters"
          }
        if(!user.address){
            errors.address="you must enter an address"
        }
        if (user.dni.length < 3) {
            errors.dni = "DNI is required";
          } else if (/[^0-9]/g.test(user.dni)) {
            errors.dni = "Received only numbers";
          }
          if (user.phone_number.length < 3) {
            errors.phone = "Phone is required";
          } else if (/[^0-9]/g.test(user.phone_number)) {
            errors.phone_number = "Received only numbers";
          }
        return errors;   
    }
    
    const handleSubmit = (e)=> {
        e.preventDefault();
        if(!errors){
            setUser({
                name: "",
                last_name: "",
                user_name: "",
                email: "",
                password: "",
                dni: "",
                phone_number: "",
                address: "",
                rol: '',
                birthday: ""
            })
            dispatch(register(user))
            alert('usuario creado')
            
        }
        dispatch(registerClear())
        navigate("/login")
        
    }
    
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value,
        });
        setErrors(registerValidate({
            ...user,
            [e.target.name] : e.target.value,
        })
    )}


    


    return (
        <>
          <div className={s.contenedor} >
            <form class="needs-validation" onSubmit={(e)=> handleSubmit(e)} autocomplete="off">
                <h1 class="fw-bold text-center pt-5 mb-5 ">Welcome:  Create Account</h1>     
                <div class="container w-75  shadow-lg p-3 mb-5 bg-white rounded">
                
                    <div class="row align-items-center align-items-center ">
                        <div class='col-lg-5'>
                        <figure class="figure">
                            <img src={imagen1} class="figure-img img-fluid rounded" alt="..."/>
                            <figcaption class="figure-caption"></figcaption>
                        </figure>
                        </div>
                        <div class="col bg-white p-3 col-lg-7 col-xl-6 rounded-end">
                        <p className="title">Please complete the fields to use our services</p>
                            
                            {/* Formulario de Register */}
                        <div class="mb-3">    
                            <label htmlFor="validationCustom03" class="form-label"><strong>Name:</strong></label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                class="form-control"
                                aria-describedby="Insert your name"
                                placeholder='Insert your  Name'
                                onChange={handleChange}
                                />
                        </div>
                              {errors.name && <p class='text-danger'>{errors.name}</p>}                   
                        
                        <div class="mb-3">
                            <label htmlFor="validationCustom03" class="form-label"><strong>Last_Name:{" "}</strong>
                            </label>
                            <input
                                id="last_name"
                                name='last_name'
                                type="text"
                                class="form-control"
                                aria-describedby="Insert your last_name"
                                placeholder='Insert your Last Name'
                                onChange={handleChange}
                                />
                            {errors.last_name && <p class='text-danger'>{errors.last_name}</p>}  
                        </div>
                        <div class="mb-3">     
                            <label htmlFor="validationCustom03" class="form-label"><strong>Email:</strong>
                            </label>
                            <input
                                id="email"
                                name='email'
                                type="email"
                                class="form-control"
                                aria-describedby="Insert your email"
                                placeholder='Insert your email example@algo.com'
                                onChange={handleChange}
                                />
                            {errors.email && <p class='text-danger'>{errors.email}</p>}  
                        </div>

                        <div class="mb-3">
                        <label htmlFor="validationCustom03" class="form-label"><strong>Bitrhday:{" "}</strong>
                            </label>
                            <input
                                id="birthday"
                                name='birthday'
                                type="date"
                                class="form-control"
                                aria-describedby="Insert your Birthday"
                                placeholder='Insert your Last Name'
                                onChange={handleChange}
                            />
                            {errors.birthday && <p class='text-danger'>{errors.birthday}</p>}  
                        </div>
                        
                        <div class="mb-3">
                            <label htmlFor="validationCustom03" class="form-label"><strong>User Name:{" "}</strong></label>
                            <input
                                id="user_name"
                                name='user_name'
                                type="text"
                                class="form-control"
                                aria-describedby="Insert your user_name"
                                placeholder='username'
                                onChange={handleChange}
                                />
                        </div>
                            {errors.user_name && <p class='text-danger'>{errors.user_name}</p>}  
                       
                        <div class="mb-3">
                            <label htmlFor="validationCustom03" class="form-label"><strong>Password:{" "}</strong></label>
                            <input
                                id="password"
                                name='password'
                                type="password"
                                class="form-control"
                                aria-describedby="Insert your name"
                                placeholder='Insert your password min characters 8'
                                onChange={handleChange}
                                />
                        </div>
                            {errors.password && <p class='text-danger'>{errors.password}</p>} 
                        
                        <div class="mb-3">
                            <label htmlFor="validationCustom03" class="form-label"><strong>Dni:{" "}</strong></label>
                            <input
                                id="dni"
                                name="dni"
                                type="number"
                                class="form-control"
                                aria-describedby="Insert your dni"
                                placeholder='Insert your dni or social segurity'
                                onChange={handleChange}
                                />
                        </div>
                            {errors.dni && <p class='text-danger'>{errors.dni}</p>} 
                        
                        <div class="mb-3">
                            <label htmlFor="validationCustom03" class="form-label"><strong>Address:{" "} </strong> Street - Number - City - Postal Code - Country </label>
                            <input
                                id="address"
                                name='address'
                                type="text"
                                class="form-control"
                                placeholder='Street Name/Number - City - Postal Code - Country'
                                onChange={handleChange}
                                />
                        </div>
                            {errors.address && <p class='text-danger'>{errors.address}</p>} 
                        
                        <div class="mb-3">
                            <label htmlFor="validationCustom03" class="form-label"><strong>Phone Number:{" "} </strong></label>
                            <input
                                type="text"
                                class="form-control"
                                id="phone_number"
                                name='phone_number'
                                placeholder='Phone Number'
                                onChange={handleChange}
                            />
                        </div>
                            {errors.phone_number && <p class='text-danger'>{errors.phone_number}</p>} 

                        <div class="mb-3">
                            <label htmlFor="validationCustom03" class="form-label"><strong>Profile Image:{" "}</strong></label>
                            <input
                                id="img"
                                name='img'
                                class="form-control"
                                type="file"
                                placeholder='Add your avatar'
                                onChange={handleChange}
                            />
                        </div>
                            {errors.img && <p class='text-danger'>{errors.img}</p>} 
                            <input 
                                class="form-check-input" 
                                type="checkbox" 
                                value="user" 
                                id="flexCheckDefault"/>
                            <label class="form-check-label" for="flexCheckDefault">
                                User
                            </label>
                            {errors.rol && <p class='text-danger'>{errors.rol}</p>} 
                        
                        <div className="d-grid">
                                <button
                                    type="submit"
                                    class={s.btn}>SUBMIT
                                </button>
                                
                        </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        </>
    );
}; 
       

   
export default Register;
