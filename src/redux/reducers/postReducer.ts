import { POSTS_ACTIONS, PostsActions } from "../actions/postActions";
import {
  UIPostsResponse,
  SingleUIPostsResponse
} from "../../api/endpoints/posts/postsTypes";
import { Reducer } from "redux";
import { UIServerMessages } from "../../api/endpoints/common/errorDataUnpacker";

interface InitialStateType {
  pending: boolean;
  posts: SingleUIPostsResponse[];
  errors: UIServerMessages["messages"];
  total: number;
}

// interface PostReducerAction {
//   type: POSTS_ACTIONS;
//   payload: UIPostsResponse;
// }

export const initialState: InitialStateType = {
  pending: false,
  posts: [],
  errors: [],
  total: 0
};

export function productsReducer(
  state = initialState,
  action
): Reducer<InitialStateType, PostsActions> {
  switch (action.type) {
    case POSTS_ACTIONS.FETCH_POSTS_PENDING: {
      return {
        ...state,
        pending: false;
      };
    }

    case POSTS_ACTIONS.FETCH_POSTS_SUCCESS: {
      return {
        ...state,
        pending: false,
        posts: [...state.posts, ...action.posts.postsList],
        total: action.payload.totalNumberOfPosts
      };
    }

    case POSTS_ACTIONS.ADD_NEW_POST: {
      return {
        ...state,
        posts: [...state.posts, action.post]
      };
    }

    case POSTS_ACTIONS.FETCH_POSTS_ERROR: {
      return {
        ...state,
        pending: false,

        errors: action.error.messages
      };
    }

    default: {
      return state;
    }
  }
}

export const getProducts = (state: InitialStateType) => state.posts;
export const getTotalPosts = (state: InitialStateType) => state.total;
export const getProductsPending = (state: InitialStateType) => state.pending;
export const getProductsError = (state: InitialStateType) => state.errors;
