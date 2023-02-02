import { GET_ALL_CATEGORIES,GET_SINGLE_CATEGORY } from "./constants";
import SERVER from "../../server";

export function getCategories(){
    return async function(dispatch){
        try {
            const response = await fetch(`${SERVER}/categories`);
            const categories = await response.json();
            dispatch({ type: GET_ALL_CATEGORIES, payload: categories });
        } catch (error) {
            console.log(error);
        }
    }
}

export function getSingleCategory(name){
    return async function(dispatch){
        try {
            const response = await fetch(`${SERVER}/categories/${name}`);
            const category = await response.json();
            dispatch({ type: GET_SINGLE_CATEGORY, payload: category });
        } catch (error) {
            console.log(error);
        }
    }
}