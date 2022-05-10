import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login(){
    const [input, setInput] = useState({
        email:'',
        password:''
    });

    const handleSubmit = (e)=>{
        e.preventDefault()
    }

    //const handleChange =()

    return(
        <div>
            <form className='form' onSubmit={handleSubmit}>
                <div>
                    <h1>Sign In</h1>
                </div>
                <div>
                    <label html="email">email:</label>
                    <input 
                        type="email"
                        id="email"
                        placeholder='Enter your email...'
                        required
                        onChange={handleChange}
                    >
                    </input>
                </div>
                <div>
                    <label html="email">password:</label>
                    <input 
                        type="password"
                        id="password"
                        placeholder='Enter your password...'
                        required
                        onChange={e => setInput(e.target.value)}
                    >
                    </input>
                </div>


            </form>
        </div>
    )
}