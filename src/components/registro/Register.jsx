import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const formulary ={
    name:"",
    last_name:"",
    user_name:"",
    email:"",
    password:"",
    dni:"",
    phone_number:"",
    address:{
        street:"",
        postal_code:"",
        city:"",
        country:""
    },
    rol:"",
    birthday:""
}


const Register = () => {
 const navigate= useNavigate();
 const [form, setForm] = useState(formulary);
 const [error, setError]= useState({})

    return (
        <div className="row g-0 pt-3">
            <div class="title px-lg-5 pt-lg-4 pb-2 p-4">
                <h1>Ecommerce plin plin</h1>
            </div>
            <br />
            <h2>Welcome</h2>
            <form>
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="name" class="form-control" id="name" aria-describedby="userName" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" />
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                <div class="mb-3">
                    <label for="formFile" class="form-label">Default file input example</label>
                    <input class="form-control" type="file" id="formFile" />
                </div>
            </form>
          
            
        </div>
    );
}

export default Register;
