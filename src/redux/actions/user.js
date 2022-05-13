import axios from 'axios';
import Swal from 'sweetalert2';
import { USER_LOGIN, USER_LOGOUT } from './constants';


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
     alert("user or pass invalid");
  } 
}

export const logout = () => (dispatch) => {
    localStorage.clear();
    window.location.ref ="/";  //me refresca la pagina y limpia el local
    dispatch({
        type: USER_LOGOUT,
    })
};