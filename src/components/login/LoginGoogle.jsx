import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode'
import { useDispatch } from 'react-redux';
import { getAllUsers, userLoginGoogle } from '../../redux/actions/user';



function LoginGoogle() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
   
    const handleCallbackResponse = (response)=>{ 
      const userObj = jwtDecode(response.credential);
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
      
        <div id='signInDiv'></div>
    )
}
export default LoginGoogle;

