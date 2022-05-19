import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function LoginGoogle() {
  const navigate = useNavigate();

  return (
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
          navigate('/')
        }
      }
        onError={() => {
          console.log("Login Failed");
        }}
      /> 
  );
}
export default LoginGoogle;
