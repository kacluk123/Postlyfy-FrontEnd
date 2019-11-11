import { POSTS_ACTIONS_NAMES, PostsActions } from "../actions/postActions";
import { SingleUIPostsResponse } from "../../api/endpoints/posts/postsTypes";
import { UIServerMessages } from "../../api/endpoints/common/errorDataUnpacker";

interface InitialStateType {
  readonly pending: boolean;
  readonly posts: SingleUIPostsResponse[];
  readonly errors: UIServerMessages["messages"];
  readonly total: number;
}

export const initialState = {
  pending: false,
  posts: [],
  errors: [],
  total: 0
};

export function postsReducer(
  state: InitialStateType = initialState,
  action: PostsActions
) {
  switch (action.type) {
    case POSTS_ACTIONS_NAMES.FETCH_POSTS_PENDING: {
      return {
        ...state,
        pending: false
      };
    }

    case POSTS_ACTIONS_NAMES.FETCH_POSTS_SUCCESS: {
      return {
        ...state,
        pending: false,
        posts: action.initial
          ? action.posts.postsList
          : [...state.posts, ...action.posts.postsList],
        total: action.posts.totalNumberOfPosts
      };
    }

    case POSTS_ACTIONS_NAMES.ADD_NEW_POST: {
      return {
        ...state,
        posts: [...state.posts, action.post]
      };
    }

    case POSTS_ACTIONS_NAMES.FETCH_POSTS_ERROR: {
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
