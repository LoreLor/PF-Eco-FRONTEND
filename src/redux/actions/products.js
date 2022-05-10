import {
    GET_ALL_PRODUCTS_FAIL,
    GET_ALL_PRODUCTS_REQUEST,
    GET_ALL_PRODUCTS_SUCCESS,
    GET_PRODUCT_BY_NAME_FAIL,
    GET_PRODUCT_BY_NAME_REQUEST,
    GET_PRODUCT_BY_NAME_SUCCESS
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
        const product = await axios.get(`${SERVER}products?name=${name}`)
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

