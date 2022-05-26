import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
//Conexion al store
import { Provider } from 'react-redux';
import store, {Persistor} from './redux/store/index';
import { PersistGate } from 'redux-persist/integration/react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="74065711880-a66epk147cn7qohac76h2s5fq8qpqpsm.apps.googleusercontent.com">
      <PayPalScriptProvider options={{ "client-id": "AaQI-1adqVEH1wWgNAa9IlvPvWf4rOLo5-zttK1nrlMMxkU1WBUo0zSmPfWpKVWaBTL3TpwiQl1dEaDQ"}}>
        <Provider store={store}>
          <BrowserRouter>
            <PersistGate loading={null} persistor={Persistor}>
              <App />
            </PersistGate>
          </BrowserRouter>   
        </Provider>
      </PayPalScriptProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

