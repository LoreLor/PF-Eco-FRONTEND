import axios from 'axios';
import { USER_LOGIN, USER_LOGOUT, USER_REGISTER, USER_REGISTER_CLEAR, GET_USERS,GET_USER, USER_UPDATE, USER_LOGIN_GOOGLE } from './constants';
import SERVER from '../../server';

export const userLogin = (data) => async(dispatch) =>{
    try {
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
  dispatch({
    type: USER_LOGOUT,
  })
  window.localStorage.clear();
};

export const register = (body) => async(dispatch) => {
  try{
    const {data} = await axios.post(`${SERVER}/user`, body)
    
      dispatch({
        type: USER_REGISTER,
        payload: data
      });
    
      dispatch({
        type: USER_LOGIN,
        payload: data
      })
      localStorage.setItem('userInfo', JSON.stringify(data))
    }catch(error){
      return error;
    }

  }

export const registerClear = ()=>(dispatch) =>{
  localStorage.clear()
  dispatch({
    type:USER_REGISTER_CLEAR
  })
};

export function getAllUsers (){
  return async function(dispatch){
      try {
      const response = await fetch(`${SERVER}/user`);
      const users = await response.json();
      dispatch({ type: GET_USERS, payload: users });
    } catch (error) {
      console.log(error);
    }
  }
}

export function getSingleUser(id){
  return async function(dispatch){
    try{
      const response = await axios.get(`${SERVER}/user/${id}`)
      const result = response.data
      dispatch({type:GET_USER,payload:result})
    }catch(error){
      console.log(error)
    }
  }
}

export const userUpdate = ( userId, body) => async(dispatch) =>{
  try {
    const {data} = await axios.put(`${SERVER}/user/${userId}`,body)
    console.log('data', data)
    dispatch({
      type: USER_UPDATE,
      payload: data
    })
    
  } catch (error) {
    console.log(error)
    
  }
}

export const userLoginGoogle = (data) => async(dispatch) =>{
  try {
    const userGoogle= await axios.post(`${SERVER}/user/googlelogin`, data)
    console.log('data', userGoogle)
  dispatch({
    type: USER_LOGIN_GOOGLE,
    payload: userGoogle.data
  },
  localStorage.setItem('userInfo', JSON.stringify(userGoogle)))

}catch (error) {
console.log(error)
} 
}

export const profileUpdate = (data) => async(dispatch) =>{
  try {
    dispatch({
      type: USER_UPDATE,
      payload: data
    })
  } catch (error) {
    console.log(error)
  }
}

export const logoutGoogle = ()=>{
   
}

