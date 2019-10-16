import { POSTS_ACTIONS } from "../actions/postActions";
import {
  UIPostsResponse,
  SingleUIPostsResponse
} from "../../api/endpoints/posts/postsTypes";

interface InitialStateType {
  pending: boolean;
  posts: SingleUIPostsResponse[];
  error: null;
  total: number;
}

interface PostReducerAction {
  type: POSTS_ACTIONS;
  payload: UIPostsResponse;
}

export const initialState: InitialStateType = {
  pending: false,
  posts: [],
  error: null,
  total: 0
};

export function productsReducer(
  state: InitialStateType = initialState,
  action: PostReducerAction
) {
  switch (action.type) {
    case POSTS_ACTIONS.FETCH_PRODUCTS_PENDING: {
      return {
        ...state,
        pending: true
      };
    }

    case POSTS_ACTIONS.FETCH_PRODUCTS_SUCCESS: {
      return {
        ...state,
        pending: false,
        posts: [...state.posts, ...action.payload.postsList],
        total: action.payload.totalNumberOfPosts
      };
    }

    case POSTS_ACTIONS.ADD_NEW_POST: {
      return {
        ...state,
        posts: [...state.posts, action.payload]
      };
    }

    default: {
      return state;
    }
  }
}

export const getProducts = (state: InitialStateType) => state.posts;
export const getProductsPending = (state: InitialStateType) => state.pending;
export const getProductsError = (state: InitialStateType) => state.error;
