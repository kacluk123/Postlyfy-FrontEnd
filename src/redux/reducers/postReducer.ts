import { FETCH_PRODUCTS_PENDING, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_ERROR, ADD_NEW_POST } from '../actions/postActions';

export const initialState = {
    pending: false,
    posts: [],
    error: null,
    total: 0,
}

export function productsReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_PRODUCTS_PENDING: {
            return {
                ...state,
                pending: true
            }
        }
            
        case FETCH_PRODUCTS_SUCCESS: {
            return {
                ...state,
                pending: false,
                posts: action.payload.posts,
                total: action.payload.total
            }
        }
           
        case FETCH_PRODUCTS_ERROR: {
            return {
                ...state,
                pending: false,
                error: action.error
            }
        }

        case ADD_NEW_POST: {
            return {
                ...state,
                posts: [...state.posts, action.payload],
            }
        }
           
        default: {
            return state;
        }
            
    }
}

export const getProducts = state => state.posts;
export const getProductsPending = state => state.pending;
export const getProductsError = state => state.error;
