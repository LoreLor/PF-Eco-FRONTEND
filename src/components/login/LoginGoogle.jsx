import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import * as queryString from "query-string";

const queryParams = queryString.stringify({
    client_id: 'CLIENT_ID_FROM_THE_APP', // It must correspond to what we declared earlier in the backend
    scope: "email", // This is the user data you have access to, in our case its just the mail.
    redirect_uri: redirectUri, // This is the uri that will be redirected to if the user signs into his google account successfully
    auth_type: "rerequest", // This tells the consent screen to reappear if the user initially entered wrong credentials into the google modal
    display: "popup", 
    response_type: "code" // This tells Google to append code to the response which will be sent to the backend which exchange the code for a token
});
const url = `https://accounts.google.com/o/oauth2/v2/auth?${queryParams}`;

render () {
...
<a href={url}>Continue with Google</a>
}

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

