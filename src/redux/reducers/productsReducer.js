
import { GET_ALL_CATEGORIES, 
    GET_ALL_PRODUCTS_FAIL, 
    GET_ALL_PRODUCTS_REQUEST, 
    GET_ALL_PRODUCTS_SUCCESS, 
    GET_CATEGORY_CHECK, 
    GET_PRODUCT_BY_ID_FAIL, 
    GET_PRODUCT_BY_ID_REQUEST, 
    GET_PRODUCT_BY_ID_SUCCESS, 
    GET_PRODUCT_BY_NAME_FAIL, 
    GET_PRODUCT_BY_NAME_REQUEST, 
    GET_PRODUCT_BY_NAME_SUCCESS,
    FILTER_BY_CATEGORY,
    CLEAN_DETAIL
} from "../actions/constants";


const initialState ={
    products:[],
    showedProducts: [],
    detail:{},
    loading: true,
    error: {},
    categoriesDb:[]
}

export const productsReducer = (state=initialState, action) => {
    switch(action.type){
        case GET_ALL_PRODUCTS_REQUEST:
            return{
                ...state,
                loading: true
            }

        case GET_ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading:false,
                products: action.payload,
                showedProducts: action.payload,
            }

        case GET_ALL_PRODUCTS_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload
            }

        case GET_PRODUCT_BY_NAME_REQUEST:
            return{
                ...state,
                loading: true
            }

        case GET_PRODUCT_BY_NAME_SUCCESS:
            return {
                ...state,
                loading:false,
                products: action.payload,
                showedProducts: action.payload,
            }

        case GET_PRODUCT_BY_NAME_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload
            }

        case GET_PRODUCT_BY_ID_REQUEST:
            return{
                ...state,
                loading: true
            }

        case GET_PRODUCT_BY_ID_SUCCESS:
            return {
                ...state,
                loading:false,
                detail: action.payload
            }

        case GET_PRODUCT_BY_ID_FAIL:
            return {
                ...state,
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
        case FILTER_BY_CATEGORY:
            const all = state.products;
            const filter = action.payload === 'all' ? all : all.filter(p => p.categories.find(d => d.name === action.payload))
            return {
                ...state,
                showedProducts: filter
            }
        case CLEAN_DETAIL:
            return{
                ...state,
                detail: {}
            }

        default:
            return state
    }
}