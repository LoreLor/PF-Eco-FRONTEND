import axios from 'axios';
import { UNSAFE_NavigationContext } from 'react-router-dom';
import Swal from 'sweetalert2';
import { USER_LOGIN, USER_LOGOUT, USER_REGISTER, USER_REGISTER_CLEAR } from './constants';


const SERVER = "http://localhost:3001";

export const userLogin = (email, password) => async(dispatch) =>{
    try {
    const { data } = await axios.post(`${SERVER}/user/signin`, {email,password} )
    // console.log(data) 
    dispatch({
      type: USER_LOGIN,
      payload: data
    },
    localStorage.setItem('userInfo', JSON.stringify(data)))
 
  }catch (error) {
     console.log(error)
    
  } 
}

export const logout = () => (dispatch) => {
   localStorage.clear()
    dispatch({
        type: USER_LOGOUT,
    })
};

export const register = ( name, last_name, user_name, email, phone_number, password, dni, address, birthday) => async(dispatch) => {
  try{
    const {data} = await axios.post(`${SERVER}/user`, {
      name, 
      last_name, 
      user_name, 
      email, 
      phone_number, 
      password, 
      dni, 
      address,   
      birthday
    })
    
      dispatch({
        type: USER_REGISTER,
        payload: data
      },
      localStorage.setItem('userInfo', JSON.stringify(data)))
    }catch(error){
      console.log(error)
    }

  }

export const registerClear = ()=>(dispatch) =>{
  localStorage.clear()
  dispatch({
    type:USER_REGISTER_CLEAR
  })
};