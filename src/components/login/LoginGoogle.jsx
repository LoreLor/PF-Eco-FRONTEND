<<<<<<< HEAD
import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
=======
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode'
import axios, { Axios } from 'axios';
import SERVER from '../../server';
import { useDispatch } from 'react-redux';
import { getAllUsers, userLoginGoogle } from '../../redux/actions/user';

>>>>>>> 9e699540b68f2750130481119f19094af9ed8ac6


function LoginGoogle() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
   
    const handleCallbackResponse = (response)=>{ 
      const userObj = jwtDecode(response.credential);
      //console.log('userObj :>> ', userObj);
      // axios({
      //   method: "POST",
      //   url: `${SERVER}/user/googlelogin`,
      //   data:{idToken: response.credential}
      // })
      dispatch(getAllUsers())
      dispatch(userLoginGoogle({idToken:response.credential}))
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
<<<<<<< HEAD
        <div>
            { showloginButton ?
                <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Log in with Google"
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                /> : null}

            { showlogoutButton ?
                <GoogleLogout
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Sign Out"
                    onLogoutSuccess={onSignoutSuccess}
                >
                </GoogleLogout> : null
            }
        </div>
    );
=======
      
        <div id='signInDiv'></div>
    )
>>>>>>> 9e699540b68f2750130481119f19094af9ed8ac6
}
export default LoginGoogle;

