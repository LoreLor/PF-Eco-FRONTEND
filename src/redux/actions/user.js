import axios from 'axios';
import { USER_LOGIN, USER_LOGOUT, USER_REGISTER, USER_REGISTER_CLEAR, GET_USERS,GET_USER } from './constants';


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
  //  console.log(error)
     return error;
  } 
}

export const logout = () => (dispatch) => {
   localStorage.clear()
    dispatch({
        type: USER_LOGOUT,
    })
};

export const register = ( body) => async(dispatch) => {
  try{
    const {data} = await axios.post(`${SERVER}/user`, body)
    
      dispatch({
        type: USER_REGISTER,
        payload: data.user
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
      const response = await fetch(`${SERVER}/user/${id}`)
      const user = await response.json();
      dispatch({type:GET_USER,payload:user})
    }catch(error){
      console.log(error)
    }
  }
}



