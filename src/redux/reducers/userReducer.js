import { GET_USER, GET_USERS, USER_LOGIN, USER_LOGOUT, USER_REGISTER, USER_REGISTER_CLEAR } from "../actions/constants"


const initialState = {
    userInfo:localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')): {},
    userEdit:{},
    users: []
}

export const userReducer =(state=initialState, action)=>{
    switch(action.type){
        case USER_LOGIN:
            return {
                ...state,
                userInfo: action.payload
            }
        case USER_LOGOUT:
            return {
                ...state,
                userInfo:{}
            }
        case USER_REGISTER:
            return {
                ...state,
                userInfo: action.payload
            }
        case USER_REGISTER_CLEAR:
            return {
                ...state,
                userInfo:{}
            }
        case GET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case GET_USER:
            return{
                ...state,
                userEdit: action.payload
            }

        default:
            return state;
    }
}