import {
  UIPostsResponse,
  SingleUIPostsResponse
} from "../../api/endpoints/posts/postsTypes";
import { UIServerMessages } from "../../api/endpoints/common/errorDataUnpacker";

export enum POSTS_ACTIONS_NAMES {
  FETCH_POSTS_PENDING = "FETCH_PRODUCTS_PENDING",
  FETCH_POSTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS",
  FETCH_POSTS_ERROR = "FETCH_PRODUCTS_ERROR",
  ADD_NEW_POST = "ADD_NEW_POST"
}

export interface IPostsBaseAction {
  type: POSTS_ACTIONS_NAMES;
}

export interface IfetchPostsPending extends IPostsBaseAction {
  type: POSTS_ACTIONS_NAMES.FETCH_POSTS_PENDING;
}

export interface IfetchProductsSuccess extends IPostsBaseAction {
  posts: UIPostsResponse;
  type: POSTS_ACTIONS_NAMES.FETCH_POSTS_SUCCESS;
}

export interface IfetchProductsError extends IPostsBaseAction {
  error: UIServerMessages;
  type: POSTS_ACTIONS_NAMES.FETCH_POSTS_ERROR;
}

export interface IaddNewPost extends IPostsBaseAction {
  post: SingleUIPostsResponse;
  type: POSTS_ACTIONS_NAMES.ADD_NEW_POST;
}

export type PostsActions =
  | IfetchPostsPending
  | IfetchProductsSuccess
  | IaddNewPost
  | IfetchProductsError;

export function fetchProductsSuccess(
  posts: UIPostsResponse
): IfetchProductsSuccess {
  return {
    type: POSTS_ACTIONS_NAMES.FETCH_POSTS_SUCCESS,
    posts
  };
}

export function fetchProductsPending(): IfetchPostsPending {
  return {
    type: POSTS_ACTIONS_NAMES.FETCH_POSTS_PENDING
  };
}

export function fetchProductsError(
  error: UIServerMessages
): IfetchProductsError {
  return {
    type: POSTS_ACTIONS_NAMES.FETCH_POSTS_ERROR,
    error
  };
}

export function addNewPost(post: SingleUIPostsResponse): IaddNewPost {
  return {
    type: POSTS_ACTIONS_NAMES.ADD_NEW_POST,
    post
  };
}
