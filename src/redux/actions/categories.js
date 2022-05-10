import { GET_ALL_CATEGORIES, GET_CATEGORY_CHECK } from "./constants";

const SERVER = "http://localhost:3001";

export function addCategoriesCheck(name){
    return function(dispatch){
        return fetch(`${SERVER}/categories/${name}`)
        .then(response=>response.json())
        .then((category)=>{dispatch({type:GET_CATEGORY_CHECK,payload: category})
    })
    .catch(error=>{
        console.log(error)
    })
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