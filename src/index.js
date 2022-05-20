import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
//Conexion al store
import { Provider } from 'react-redux';
import { store } from './redux/store/index';
import  {  GoogleOAuthProvider  } from '@react-oauth/google'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="74065711880-a66epk147cn7qohac76h2s5fq8qpqpsm.apps.googleusercontent.com">
    <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>   
      </Provider>
      </GoogleOAuthProvider>;
  </React.StrictMode>
);

