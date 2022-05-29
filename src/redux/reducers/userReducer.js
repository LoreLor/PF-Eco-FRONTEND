import { GET_USER, GET_USERS, USER_LOGIN, USER_LOGIN_GOOGLE,USER_LOGOUT,USER_UPDATE } from "../actions/constants"


const initialState = {
    userInfo: {},
    userEdit:{},
    users: []
}

export const userReducer =(state=initialState, action)=>{
    switch(action.type){

        case USER_LOGIN:
            return {
                ...state,
                userInfo: action.payload,
            }

        case USER_LOGOUT:
            return {
                ...state,
                userInfo:{},
                userEdit:{},
                users:[],
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
        case USER_UPDATE:
            return{
                ...state,
                userInfo: action.payload
            }
        case USER_LOGIN_GOOGLE:
            return {
                ...state,
                userInfo: action.payload,
            }

        default:
            return state;
    }
}