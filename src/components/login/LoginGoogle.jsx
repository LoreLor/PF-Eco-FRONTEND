import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';


function LoginGoogle() {

    const [showloginButton, setShowloginButton] = useState(true);
    const [showlogoutButton, setShowlogoutButton] = useState(false);
    
    const onLoginSuccess = (googleData) => {
        console.log('Login Success:', googleData);
        setShowloginButton(false);
        setShowlogoutButton(true);
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    const onSignoutSuccess = () => {
        alert("You have been logged out successfully");
        console.clear();
        setShowloginButton(true);
        setShowlogoutButton(false);
    };
    

    return (
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
}
export default LoginGoogle;