import { GET_ALL_CATEGORIES,GET_SINGLE_CATEGORY } from "./constants";

const SERVER = "http://localhost:3001";

export function getCategories(){
    return function(dispatch){
        return fetch(`${SERVER}/categories`)
        .then(response=>response.json())
        .then((categories)=>{dispatch({type:GET_ALL_CATEGORIES,payload:categories})
    })
    .catch(error=>{
        console.log(error)
    })
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