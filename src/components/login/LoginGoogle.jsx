import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function LoginGoogle() {
  const navigate = useNavigate();
  const [clientId, setClientid]=useState('');


  return (
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
          navigate('/')
          window.location.reload()

        }
      }
        onError={() => {
          console.log("Login Failed");
        }}
      /> 
  );
}
export default LoginGoogle;
