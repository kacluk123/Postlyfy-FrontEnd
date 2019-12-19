import { POSTS_ACTIONS_NAMES, PostsActions } from "../actions/postActions";
import { SingleUIPostsResponse } from "../../api/endpoints/posts/postsTypes";
import { UIServerMessages } from "../../api/endpoints/common/errorDataUnpacker";
import { AppState } from '../store';

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
        posts: [action.post, ...state.posts]
      };
    }

    case POSTS_ACTIONS_NAMES.ADD_COMMENT_TO_POST: {
      return {
        ...state,
        posts: state.posts.map((post: SingleUIPostsResponse) => {
          if (post.postId !== action.comment.comment.postId) {
            return post;
          }

          const { comments, ...otherProp } = post;

          return {
            ...otherProp,
            comments: [action.comment.comment, ...comments]
          };
        })
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

export const getProducts = (state: AppState) => state.postsReducer.posts;
export const getTotalPosts = (state: AppState) => state.postsReducer.total;
export const getProductsPending = (state: AppState) => state.postsReducer.pending;
export const getProductsError = (state: AppState) => state.postsReducer.errors;
