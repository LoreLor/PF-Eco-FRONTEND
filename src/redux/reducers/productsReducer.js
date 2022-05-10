import {GET_ALL_PRODUCTS_FAIL, GET_ALL_PRODUCTS_REQUEST, GET_ALL_PRODUCTS_SUCCESS, 
        GET_PRODUCT_BY_NAME_FAIL, GET_PRODUCT_BY_NAME_REQUEST, GET_PRODUCT_BY_NAME_SUCCESS,
        GET_CATEGORY_CHECK,GET_ALL_CATEGORIES } from "../actions/constants";

const initialState ={
    products:[],
    loading: true,
    error: {},
    categoriesDb:[]
}

export const productsReducer = (state=initialState, action) => {
    switch(action.type){
        case GET_ALL_PRODUCTS_REQUEST:
            return{
                loading: true
            }

        case GET_ALL_PRODUCTS_SUCCESS:
            return {
                loading:false,
                products: action.payload
            }

        case GET_ALL_PRODUCTS_FAIL:
            return {
                loading:false,
                error:action.payload
            }

        case GET_PRODUCT_BY_NAME_REQUEST:
            return{
                loading: true
            }

        case GET_PRODUCT_BY_NAME_SUCCESS:
            return {
                loading:false,
                products: action.payload
            }

        case GET_PRODUCT_BY_NAME_FAIL:
            return {
                loading:false,
                error:action.payload
            }
        case GET_ALL_CATEGORIES:
            return {
                ...state,
                categoriesDb:action.payload
            }
        case GET_CATEGORY_CHECK:
            return {
                ...state,
                categoriesDb:[...state.categoriesDb,action.payload]
            }
        default:
            return state
    }
}