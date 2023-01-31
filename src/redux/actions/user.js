import axios from 'axios';
<<<<<<< HEAD
import { USER_LOGIN, USER_LOGOUT, USER_REGISTER_CLEAR, GET_USERS, GET_USER, USER_UPDATE, USER_LOGIN_GOOGLE } from './constants';
=======
import { USER_LOGIN, USER_LOGOUT, USER_REGISTER_CLEAR, GET_USERS,GET_USER, USER_UPDATE, USER_LOGIN_GOOGLE, SEND_EMAIL_RP } from './constants';
>>>>>>> DevelopFront
import SERVER from '../../server';

export const userLogin = (data) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN,
      payload: data
    })

  } catch (error) {
    console.log(error)
  }
}

export const logout = () => (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
  })
  window.localStorage.clear();
};

export const registerClear = () => (dispatch) => {
  localStorage.clear()
  dispatch({
    type: USER_REGISTER_CLEAR
  })
};

export function getAllUsers() {
  return async function (dispatch) {
    try {
      const response = await fetch(`${SERVER}/user`);
      const users = await response.json();
      dispatch({ 
        type: GET_USERS,
        payload: users 
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export function getSingleUser(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${SERVER}/user/${id}`)
      const result = response.data
      dispatch({ 
        type: GET_USER, 
        payload: result 
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const userUpdate = (userId, body) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${SERVER}/user/${userId}`, body)
    dispatch({
      type: USER_UPDATE,
      payload: data
    })

  } catch (error) {
    console.log(error)

  }
}

export const userLoginGoogle = (data) => async (dispatch) => {
  try {
    const userGoogle = await axios.post(`${SERVER}/user/googlelogin`, data)
    console.log('userGoogle', userGoogle)
    dispatch({
      type: USER_LOGIN_GOOGLE,
      payload: userGoogle.data
    },
      localStorage.setItem('userInfo', JSON.stringify(userGoogle)))

  } catch (error) {
    console.log(error)
  }
}

export const profileUpdate = (data) => async (dispatch) => {
  try {
    dispatch({
      type: USER_UPDATE,
      payload: data
    })
  } catch (error) {
    console.log(error)
  }
}

export const logoutGoogle = () => {

}

export const forgotPassword = (email) => async(dispatch) => {
    const {data} = axios.post(`${SERVER}/email/forgot-password`, {email: email})
  try {
    dispatch({
      type: SEND_EMAIL_RP,
      payload: data
    })
    console.log(email)
  } catch (error) {
    console.log(error)
  }
}

