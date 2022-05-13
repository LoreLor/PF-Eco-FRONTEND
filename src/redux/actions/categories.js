import { GET_ALL_CATEGORIES, GET_CATEGORY_CHECK } from "./constants";

const SERVER = "http://localhost:3001";

export function addCategoriesCheck(name){
    console.log(name)
    return async function(dispatch){
        try {
            const response = await fetch(`${SERVER}/categories/${name}`);
            console.log(response)
            const category = await response.json();
           console.log(category)
            dispatch({ type: GET_CATEGORY_CHECK, payload: category });
        } catch (error) {
            console.log(error);
        }
    }
}

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