
import {
    GET_ALL_CATEGORIES,
    GET_ALL_PRODUCTS_FAIL,
    GET_ALL_PRODUCTS_REQUEST,
    GET_ALL_PRODUCTS_SUCCESS,
    GET_SINGLE_CATEGORY,
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
    DELETE_PRODUCT_CART
    GET_REVIEWS_PRODUCT,
    CREATE_REVIEW,
    CLEAN_REVIEW,
    EDIT_PRODUCT
} from "../actions/constants";


const initialState = {
    products: [],
    showedProducts: [],
    reviews: [],
    detail: {},
    loading: true,
    error: {},
    categoriesDb:[],
    editCategory:{},
    editProduct: {},
    cart: []
}

export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload,
                showedProducts: action.payload,
            }

        case GET_ALL_PRODUCTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case GET_PRODUCT_BY_NAME_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_PRODUCT_BY_NAME_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload,
                showedProducts: action.payload,
            }

        case GET_PRODUCT_BY_NAME_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case GET_PRODUCT_BY_ID_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_PRODUCT_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                detail: action.payload
            }

        case GET_PRODUCT_BY_ID_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case GET_ALL_CATEGORIES:
            return {
                ...state,
                categoriesDb: action.payload
            }

        case GET_SINGLE_CATEGORY:
            return {
                ...state,
                editCategory: action.payload
            }
        case EDIT_PRODUCT:
            return {
                ...state,
                editProduct: action.payload
            }
        case FILTER_BY_CATEGORY:
            const all = state.products;
            const filter = action.payload === 'all' ? all : all.filter(p => p.categories.find(d => d.name === action.payload))
            return {
                ...state,
                showedProducts: filter
            }
        case ORDER_BY_PRICE:
            if (action.payload === "default") return {
                ...state,
            }
            let sortedByPrice = [...state.showedProducts];
            sortedByPrice = action.payload === "asc" ?
                state.showedProducts.sort(function (a, b) {
                    if (a.price > b.price) return 1;
                    if (a.price < b.price) return -1;
                    return 0
                }) :
                state.showedProducts.sort(function (a, b) {
                    if (a.price < b.price) return 1;
                    if (a.price > b.price) return -1;
                    return 0;
                });
            return {
                ...state,
                showedProducts: sortedByPrice,
            }
        case FILTER_BY_PRICE:
            const all2 = state.products;
            const filter2 = all2.filter(p => p.price >= action.payload.min && p.price <= action.payload.max)
            if (filter2.length === 0) {
                alert("No products were found in that range, all products were displayed again.")
                return {
                    ...state,
                }
            }
            return {
                ...state,
                showedProducts: filter2
            }
        case CLEAN_DETAIL:
            return {
                ...state,
                detail: {}
            }
        case ADD_CART:
            return{
                ...state,
                cart: action.payload
            }
        case GET_CART:
            return{
                ...state,
                cart: action.payload
            }
        case DELETE_PRODUCT_CART:
            return{
                ...state,
                cart: action.payload
        case GET_REVIEWS_PRODUCT:
            return {
                ...state,
                reviews: action.payload
            }
        case CREATE_REVIEW:
            return {
                ...state,
            }
        case CLEAN_REVIEW:
            return {
                ...state,
                reviews: []
            }
        default:
            return state
    }
}