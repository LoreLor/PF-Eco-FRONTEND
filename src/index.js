import React from 'react';
import { render } from 'react-dom';  //v17
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
//Conexion al store
import { Provider } from 'react-redux';
import store, {Persistor} from './redux/store/index';
import { PersistGate } from 'redux-persist/integration/react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';


const root = document.getElementById('root'); // <- This is the //correct method call for React version 17
render(

  <React.StrictMode>
      <PayPalScriptProvider options={{ "client-id": "AaQI-1adqVEH1wWgNAa9IlvPvWf4rOLo5-zttK1nrlMMxkU1WBUo0zSmPfWpKVWaBTL3TpwiQl1dEaDQ"}}>
        <Provider store={store}>
          <BrowserRouter>
            <PersistGate loading={null} persistor={Persistor}>
              <App />
            </PersistGate>
          </BrowserRouter>   
        </Provider>
      </PayPalScriptProvider>
  </React.StrictMode>
 ,root
);


