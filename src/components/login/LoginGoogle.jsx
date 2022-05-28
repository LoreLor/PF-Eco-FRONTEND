import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode'
import axios from 'axios';
import SERVER from '../../server';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleUser, register, userLoginGoogle } from '../../redux/actions/user';




function LoginGoogle() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users)
   
    const handleCallbackResponse = async(response)=>{
      const userObj = jwtDecode(response.credential);
      dispatch(userLoginGoogle({idToken:response.credential}))
      console.log('login Google Success',userObj)
      navigate('/')
      
      }
    
        
    useEffect(() => {
      // eslint-disable-next-line no-undef
      google.accounts.id.initialize({
      client_id:'74065711880-a66epk147cn7qohac76h2s5fq8qpqpsm.apps.googleusercontent.com',
      callback: handleCallbackResponse
    });
      // eslint-disable-next-line no-undef
      google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      {theme:'outline', size:'large'}
    )
    }, []);

    return (   
          <div id='signInDiv'></div>      
    )
}
export default LoginGoogle;

