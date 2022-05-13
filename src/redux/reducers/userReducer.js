import { USER_LOGIN, USER_LOGOUT } from "../actions/constants"


const initialState = {
    //userInfo: localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')):null,
}

export const userReducer =(state=initialState, action)=>{
    switch(action.type){
        case USER_LOGIN:
            return {
                ...state,
                userInfo: action.payload
            }
        case USER_LOGOUT:
            return {}

        default:
            return state;
    }
}