import {
    GET_ALL_PRODUCTS_FAIL,
    GET_ALL_PRODUCTS_REQUEST,
    GET_ALL_PRODUCTS_SUCCESS,
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
    DELETE_ONE_PRODUCT_CART,
    GET_CART, 
    DELETE_PRODUCT_CART,
    DELETE_ALL_PRODUCTS_CART,
    GET_REVIEWS_PRODUCT,
    CREATE_REVIEW,
    CLEAN_REVIEW,
    PAID_CART_TEMPORAL,
    GET_SHOPPING,
    CLOSE_CART,
    SAVE_PAYMENT_METHOD,
    ADD_PRODUCT_GUEST,
    DELETE_ONE_PRODUCT_GUEST,
    GET_REVIEWS_PRODUCT_DETAIL
} from "./constants";

import axios from 'axios';
import SERVER from "../../server";

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

//------añade un prodcto al carrito
export function addCartProduct (payload){
    //console.log(payload)
    return async function(dispatch){
        const json = await axios.post(`${SERVER}/cart?userId=${payload.userId}&productId=${payload.productId}&updated_quantity=sum`)
        //console.log(json)
        return dispatch({
            type: ADD_CART,
            payload: json.data
        })
    }
}

export function addCartProductGuest (payload){
    return async function (dispatch){
        const {data} = await axios.get(`${SERVER}/products/${payload.productId}`)
        return dispatch({
            type: ADD_PRODUCT_GUEST,
            payload: data 
        })
    }
}


//------resta un item del mismo carrito
export const deleteOneProduct = (userId, id) => async (dispatch) => {
    const json = await axios.post(`${SERVER}/cart?userId=${userId}&productId=${id}&updated_quantity=rest`)
    return dispatch({
        type: DELETE_ONE_PRODUCT_CART,
        payload: json.data
    })
}

//------trae el carrito
export const getCart = (id) => async (dispatch) => {
    const {data} = await axios.get(`${SERVER}/cart/${id}`)
        //console.log (data)
        dispatch({
            type: GET_CART,
            payload: data
        })
}

//------borra el producto del carrito
export const deleteProductCart = (userId, id) => async (dispatch) => {
    const json = await axios.delete(`${SERVER}/cart?userId=${userId}&productId=${id}`)
    return dispatch({
        type: DELETE_PRODUCT_CART,
        payload: json.data
    })
}

export const deleteProductCartGuest = (id) => {
    return function (dispatch){
        return dispatch({
            type: DELETE_ONE_PRODUCT_GUEST,
            payload: id
        })
    }
}

export const deleteAllProductCart = (cartId) => async (dispatch) => {
    const json = await axios.delete(`${SERVER}/cart/all?cartId=${cartId}`)
    return dispatch({
        type: DELETE_ALL_PRODUCTS_CART,
        payload: json.data
    })
}


export const createReview = (id, body) => async(dispatch) => {
    try{
      const {data} = await axios.post(`${SERVER}/review?detailId=${id}`, body)
      
        dispatch({
          type: CREATE_REVIEW,
          payload: data
        });
        
      }catch(error){
        return error;
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

export const getReviewsProductDetail = (id) => async (dispatch) => {
    dispatch({
        type: GET_REVIEWS_PRODUCT_DETAIL
    })
    try {
        const product = await axios.get(`${SERVER}/review/detail?detailId=${id}`)
        dispatch({
            type: GET_REVIEWS_PRODUCT_DETAIL,
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


export const paidCartTemporal = (cartId) => async (dispatch) => {
    const json = await axios.put(`${SERVER}/cart/?cartId=${cartId}`)
    return dispatch({
        type: PAID_CART_TEMPORAL,
        payload: json.data
    })
}

export const getShopping = (userId) => async (dispatch) => {
    dispatch({
        type: GET_SHOPPING
    })
    try {
        const product = await axios.get(`${SERVER}/cart?userId=${userId}`)
        dispatch({
            type: GET_SHOPPING,
            payload: product.data
        })

    } catch (error) {
        return error;
    }
};

export const closeCart = (userId) => async(dispatch) => {
    try {
        const {data}= await axios.put(`${SERVER}/cart?userId=${userId}&open=false`)
        dispatch({
            type: CLOSE_CART,
            payload: data
        })
        
    } catch (error) {
        console.log( error)      
    }
}





