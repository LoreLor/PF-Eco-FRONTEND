import React, { useEffect, useState } from 'react';

import { useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode'
import { register } from '../../redux/actions/user';


const clientId='74065711880-a66epk147cn7qohac76h2s5fq8qpqpsm.apps.googleusercontent.com'



function LoginGoogle() {
  const navigate = useNavigate();
  const [user, setUser]=useState({})

  const handleCallbackResponse = (response)=>{
    console.log('response.credential :>> ', response.credential);
    const userObj = jwtDecode(response.credential);
    console.log('userObj :>> ', userObj);
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
    {theme:'outline', size:'large', justifyContent: 'center'}
  )
  }, []);

  return (
      <div className='row'>
        <div id='signInDiv'></div>

      </div>
        
  )
}
export default LoginGoogle;

