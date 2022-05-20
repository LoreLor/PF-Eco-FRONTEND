import {
    GET_ALL_PRODUCTS_FAIL,
    GET_ALL_PRODUCTS_REQUEST,
    GET_ALL_PRODUCTS_SUCCESS,
    GET_PRODUCT_BY_ID_FAIL,
    GET_PRODUCT_BY_ID_REQUEST,
    GET_PRODUCT_BY_ID_SUCCESS,
    GET_PRODUCT_BY_NAME_FAIL,
    GET_PRODUCT_BY_NAME_REQUEST,
    GET_PRODUCT_BY_NAME_SUCCESS,
    FILTER_BY_CATEGORY,
    ORDER_BY_PRICE,
    FILTER_BY_PRICE,
    CLEAN_DETAIL,
    EDIT_PRODUCT,
    ADD_CART,
    GET_CART, 
    DELETE_PRODUCT_CART,
    GET_REVIEWS_PRODUCT,
    CREATE_REVIEW,
    CLEAN_REVIEW,
} from "./constants";

import axios from 'axios';

const SERVER = "http://localhost:3001";



export const getAllProducts = () => async (dispatch) => {
    dispatch({
        type: GET_ALL_PRODUCTS_REQUEST
    })
    try {
        const { data } = await axios.get(`${SERVER}/products`)
        dispatch({
            type: GET_ALL_PRODUCTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_ALL_PRODUCTS_FAIL,
            payload: error
        })
    }
};

export const getProductByName = (name) => async (dispatch) => {
    dispatch({
        type: GET_PRODUCT_BY_NAME_REQUEST
    })
    try {
        const product = await axios.get(`${SERVER}/products?name=${name}`)
        dispatch({
            type: GET_PRODUCT_BY_NAME_SUCCESS,
            payload: product.data
        })

    } catch (error) {
        dispatch({
            type: GET_PRODUCT_BY_NAME_FAIL,
            payload: error
        })
    }
};

export const getProductById = (id) => async (dispatch) => {
    const {data} = await axios.get(`${SERVER}/products/${id}`)
        dispatch({
            type: GET_PRODUCT_BY_ID_SUCCESS,
            payload: data
        })
}

export function filterByCategory(payload) {
    return {
        type: FILTER_BY_CATEGORY,
        payload
    }
}

export function orderByPrice(payload) {
    return {
        type: ORDER_BY_PRICE,
        payload
    }
}

export function filterByPrice(payload) {
    return {
        type: FILTER_BY_PRICE,
        payload
    }
}

export function limpiarDetail(){
    return {
        type: CLEAN_DETAIL
    }
}

export function editProduct(payload){
    return {
        type:EDIT_PRODUCT,
        payload
    }
}

export function addCartProduct (payload){
    //console.log(payload)
    return async function(dispatch){
        const json = await axios.post(`${SERVER}/cart?userId=${payload.userId}&productId=${payload.productId}&required_quantity=${payload.required_quantity}`)
        //console.log(json)
        return dispatch({
            type: ADD_CART,
            payload: json.data
        })
    }
}

export const getCart = (id) => async (dispatch) => {
    const {data} = await axios.get(`${SERVER}/cart/${id}`)
        //console.log (data)
        dispatch({
            type: GET_CART,
            payload: data
        })
}

export const deleteProductCart = (userId, id) => async (dispatch) => {
    const json = await axios.delete(`${SERVER}/cart?userId=${userId}&productId=${id}`)
    return dispatch({
        type: DELETE_PRODUCT_CART,
        payload: json.data
    })
}

//localhost:3001/cart?userId=e7db2292-18d8-4e63-8b90-71ebf59fb934&productId=19b46859-4a77-42e2-9ffc-4ff9858cb1cb&required_quantity=1 

export const createReview = (id, body) => async(dispatch) => {
    try{
      const {data} = await axios.post(`${SERVER}/review?detailId=${id}`, body)
      
        dispatch({
          type: CREATE_REVIEW,
          payload: data
        });
        
      }catch(error){
        console.log(error);
      }
  
    }

export const getReviewsProduct = (id) => async (dispatch) => {
    dispatch({
        type: GET_REVIEWS_PRODUCT
    })
    try {
        const product = await axios.get(`${SERVER}/review/product?productId=${id}`)
        dispatch({
            type: GET_REVIEWS_PRODUCT,
            payload: product.data
        })

    } catch (error) {
        return error;
    }
};

export function cleanReview(){
    return {
        type: CLEAN_REVIEW
    }
}
