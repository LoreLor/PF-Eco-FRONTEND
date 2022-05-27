
import Swal from "sweetalert2";
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
    ADD_PRODUCT_GUEST,
    DELETE_ONE_PRODUCT_GUEST,
    GET_REVIEWS_PRODUCT_DETAIL,
    DELETE_CART_GUEST,
    GET_CART_GUEST,
    SUBSTRACT_PRODUCT_GUEST,
    GET_FAVS,
    DELETE_ALL_FAVS,
    DELETE_FAV,
    ADD_FAV,
    CLEAR_STATES_PRODUCTS,
    CLEAN_CART,
    CLEAN_FAV,
    CLEAN_CART_GUEST
} from "../actions/constants";


const initialState = {
    products: [],
    showedProducts: [],
    reviews: [],
    review: [],
    detail: {},
    loading: true,
    error: {},
    categoriesDb: [],
    editCategory: {},
    editProduct: {},
    cart: [],
    shopping: [],
    cartGuest: [],
    favs: []
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
                Swal.fire({
                    title:"No products were found in that range, all products were displayed again.",
                    icon: "error"
                })
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
            return {
                ...state,
                cart: action.payload
            }
        case DELETE_ONE_PRODUCT_CART:
            return {
                ...state,
                cart: action.payload
            }
        case GET_CART:
            action.payload.details.sort(function (a, b) {
                if (a.id > b.id) return 1;
                if (a.id < b.id) return -1;
                return 0
            })
            return {
                ...state,
                cart: action.payload
            }
        case DELETE_PRODUCT_CART:
            return {
                ...state,
                cart: action.payload
            }
        case DELETE_ALL_PRODUCTS_CART:
            return {
                ...state,
                cart: action.payload
            }
        case PAID_CART_TEMPORAL:
            return {
                ...state,
                cart: [],
                // cart: action.payload
            }
        case GET_SHOPPING:
            return {
                ...state,
                shopping: action.payload
            }
        case GET_REVIEWS_PRODUCT:
            return {
                ...state,
                reviews: action.payload
            }
        case GET_REVIEWS_PRODUCT_DETAIL:
            return {
                ...state,
                review: action.payload
            }
        case CREATE_REVIEW:
            return {
                ...state,
            }
        case CLEAN_REVIEW:
            return {
                ...state,
                reviews: [],
                review: [],
            }
        case CLOSE_CART:
            return{
                ...state,
                cart:action.payload
            }
        case ADD_PRODUCT_GUEST:
            const item = action.payload;
            const existItem = state.cartGuest.find((p) => p.id === item.id);
            // console.log(item) el que se quiere añadir
            //console.log(existeItem) el que ya se encuentra en el carrito
            if(existItem){
                existItem.bundle += 1
                //console.log(existItem.bundle)
                return {
                    ...state,
                    cartGuest: state.cartGuest.map((p) => 
                        p.id === existItem.id ? existItem : p
                    )
                };
            }else{
                //console.log('no hay concateno')
                return{
                    ...state,
                    cartGuest: [...state.cartGuest, item] //concatena lo que ya habia a lo nuevo
                }
            }
        case GET_CART_GUEST: 
            return{
                ...state,
                cartGuest: state.cartGuest
            }
        case DELETE_ONE_PRODUCT_GUEST:
            // console.log(action.payload)
            return{
                ...state,
                cartGuest: state.cartGuest.filter(p => p.id !== action.payload)
            }
        case DELETE_CART_GUEST:
            return{
                ...state,
                cartGuest: []
            }
        case SUBSTRACT_PRODUCT_GUEST:
            const id = action.payload;
            const itemCart = state.cartGuest.find((p) => p.id === id);
            if(itemCart){
                itemCart.bundle -= 1
                return {
                    ...state,
                    cartGuest: state.cartGuest.map((p) => 
                        p.id === itemCart.id ? itemCart : p
                    )
                }
            }else{
                return{
                    ...state,
                    cartGuest: state.cartGuest
                }
            }
        case GET_FAVS:
            return{
                ...state,
                favs: action.payload
            }
        case DELETE_ALL_FAVS:
            return{
                ...state,
                favs: []
            }
        case DELETE_FAV:
            if(state.favs.length === 1){
                state.favs = []
            }
            return{
                ...state
            }
        case ADD_FAV:
            return{
                ...state
            }
        case CLEAR_STATES_PRODUCTS:
            return{
                ...state,
                shopping: [],
                review: [],
                reviews: [],
                favs: [],    
            }
        case CLEAN_CART:
            return{
                ...state,
                cart: []
            }
        case CLEAN_FAV:
            return{
                ...state,
                favs: []
            }
        case CLEAN_CART_GUEST:
                return{
                    ...state,
                    cartGuest: []
                } 
        default:
            return state
    }
}