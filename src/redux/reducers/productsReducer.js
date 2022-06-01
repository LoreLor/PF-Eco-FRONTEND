
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
    ORDER_BY_RATING,
    ORDER_BY_ALPHABET,
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
    CLEAN_CART_GUEST,
    CLEAN_PRODUCTS,
    GET_PAID_ORDERS
} from "../actions/constants";


const initialState = {
    products: [],
    showedProducts: [],
    filters: [],
    stateFilter: {
        min: "",
        max: "",
        category: "",
        orderByPrice: "",
        orderByRating: "",
        orderByAlphabet: "",
    },
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
    favs: [],
    paidOrders:[]
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
                filters: [],
                stateFilter: {}
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
            if(state.stateFilter.min > 1 && state.stateFilter.max > 1 && !state.stateFilter.category) {
                let filterByNameRange = action.payload.filter(p => p.price >= parseInt(state.stateFilter.min) && p.price <= parseInt(state.stateFilter.max))
                return {
                    ...state,
                    loading: false,
                    products: action.payload,
                    showedProducts: filterByNameRange,
                    filters: filterByNameRange
                }
            } else if(state.stateFilter.min > 1 && state.stateFilter.max > 1 && state.stateFilter.category) {
                let filterByNameRange = action.payload.filter(p => p.price >= parseInt(state.stateFilter.min) && p.price <= parseInt(state.stateFilter.max))
                filterByNameRange = filterByNameRange.filter(p => p.categories.find(d => d.name === state.stateFilter.category))
                return {
                    ...state,
                    loading: false,
                    products: action.payload,
                    showedProducts: filterByNameRange,
                    filters: filterByNameRange
                }
            } else if(state.stateFilter.category) {
                let filterByNameRange = action.payload.filter(p => p.categories.find(d => d.name === state.stateFilter.category))
                return {
                    ...state,
                    loading: false,
                    products: action.payload,
                    showedProducts: filterByNameRange,
                    filters: filterByNameRange
                }
            }
            return {
                ...state,
                loading: false,
                products: action.payload,
                showedProducts: action.payload,
                filters: action.payload
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
            var all = []
            var filter = []     
            state.stateFilter = {
                ...state.stateFilter,
                category: action.payload
            }
        if(state.filters.length) {
                all = state.filters;
                filter = action.payload === 'all' ? all : all.filter(p => p.categories.find(d => d.name === action.payload))
                if(!filter.length) {
                    all = state.products;
                    filter = action.payload === 'all' ? all : all.filter(p => p.categories.find(d => d.name === action.payload))
                    filter = filter.filter(p => p.price >= parseInt(state.stateFilter.min) && p.price <= parseInt(state.stateFilter.max))
                    if(filter.length) {
                        return {
                            ...state,
                            showedProducts: filter,
                            filters: filter
                        }
                    } 
                }
                if(state.stateFilter.min > 1 && state.stateFilter.max > 1) {
                    all = state.products;
                    filter = action.payload === 'all' ? all : all.filter(p => p.categories.find(d => d.name === action.payload))
                    filter = filter.filter(p => p.price >= parseInt(state.stateFilter.min) && p.price <= parseInt(state.stateFilter.max))
                    return {
                        ...state,
                        showedProducts: filter,
                    }
                } else {
                    all = state.products;
                    filter = action.payload === 'all' ? all : all.filter(p => p.categories.find(d => d.name === action.payload))
                    return {
                        ...state,
                        showedProducts: filter,
                    }
                }
            } else {
                all = state.products;
                filter = action.payload === 'all' ? all : all.filter(p => p.categories.find(d => d.name === action.payload))
                return {
                    ...state,
                    showedProducts: filter,
                    filters: filter,
                }
            }
        case ORDER_BY_PRICE:
            state.stateFilter = {
                ...state.stateFilter,
                orderByAlphabet: "",
                orderByRating: "",
                orderByPrice: action.payload
            }
            let sortedByPrice = [...state.showedProducts];
            sortedByPrice = action.payload === "Min to Max price" ?
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
        case ORDER_BY_RATING:
            state.stateFilter = {
                ...state.stateFilter,
                orderByAlphabet: "",
                orderByRating: action.payload,
                orderByPrice: "",
            }
            let sortedByRating = [...state.showedProducts];
            sortedByRating = action.payload === "Min to Max rating" ?
                state.showedProducts.sort(function (a, b) {
                    if (a.rating > b.rating) return 1;
                    if (a.rating < b.rating) return -1;
                    return 0
                }) :
                state.showedProducts.sort(function (a, b) {
                    if (a.rating < b.rating) return 1;
                    if (a.rating > b.rating) return -1;
                    return 0;
                });
            return {
                ...state,
                showedProducts: sortedByRating,
            }
        case ORDER_BY_ALPHABET:
            state.stateFilter = {
                ...state.stateFilter,
                orderByAlphabet: action.payload,
                orderByRating: "",
                orderByPrice: "",
            }
            let sortedByAlphabet = [...state.showedProducts];
            sortedByAlphabet = action.payload === "A to Z" ?
                state.showedProducts.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                    return 0
                }) :
                state.showedProducts.sort(function (a, b) {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                    return 0;
                });
            return {
                ...state,
                showedProducts: sortedByAlphabet,
            }
        case FILTER_BY_PRICE:
            var all2 = []
            var filter2 = []
            state.stateFilter = {
                ...state.stateFilter,
                min: parseInt(action.payload.min),
                max: parseInt(action.payload.max),
            }
        if(state.filters.length) {
                all2 = state.filters;
                filter2 = all2.filter(p => p.price >= action.payload.min && p.price <= action.payload.max)
                
                if (filter2.length === 0) {
                    Swal.fire({
                        title:"No products were found in that range, all products were displayed again.",
                        icon: "error"
                    })
                    return {
                        ...state,
                    }
                    
                } else {
                    all2 = state.products;
                    filter2 = all2.filter(p => p.price >= action.payload.min && p.price <= action.payload.max)
                    if(state.stateFilter.category) {
                        filter2 = filter2.filter(p => p.categories.find(d => d.name === state.stateFilter.category))
                        return {
                            ...state,
                            showedProducts: filter2
                        }
                    }
                    return {
                        ...state,
                        showedProducts: filter2
                    }
                }
            } else {
                all2 = state.products;
                filter2 = all2.filter(p => p.price >= action.payload.min && p.price <= action.payload.max)

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
                    showedProducts: filter2,
                    filters: filter2,
                }
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
            action.payload.details?.sort(function (a, b) {
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
            if(action.payload) {
                action.payload.sort(function (a, b) {
                    if (a.date < b.date) return 1;
                    if (a.date > b.date) return -1;
                    return 0
                })
            }
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
        case CLEAN_PRODUCTS:
                return{
                    ...state,
                    products: [],
                    showedProducts: [],
                    filters: [],
                }
        case GET_PAID_ORDERS:
            return{
                ...state,
                paidOrders: action.payload
            } 
        default:
            return state
    }
}