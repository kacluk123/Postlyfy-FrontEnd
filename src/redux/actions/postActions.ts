import {
  UIPostsResponse,
  SingleUIPostsResponse
} from "../../api/endpoints/posts/postsTypes";

import { UIServerMessages } from "../../api/endpoints/common/errorDataUnpacker";
import { Action } from "redux";

export enum POSTS_ACTIONS {
  FETCH_POSTS_PENDING = "FETCH_PRODUCTS_PENDING",
  FETCH_POSTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS",
  FETCH_POSTS_ERROR = "FETCH_PRODUCTS_ERROR",
  ADD_NEW_POST = "ADD_NEW_POST"
}

export interface IfetchPostsPending
  extends Action<POSTS_ACTIONS.FETCH_POSTS_PENDING> {}

export interface IfetchProductsSuccess
  extends Action<POSTS_ACTIONS.FETCH_POSTS_SUCCESS> {
  posts: UIPostsResponse;
}

export interface IfetchProductsError
  extends Action<POSTS_ACTIONS.FETCH_POSTS_ERROR> {
  error: UIServerMessages;
}

export interface IaddNewPost extends Action<POSTS_ACTIONS.ADD_NEW_POST> {
  post: SingleUIPostsResponse;
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
    type: POSTS_ACTIONS.FETCH_POSTS_SUCCESS,
    posts
  };
}

export function fetchProductsPending(): IfetchPostsPending {
  return {
    type: POSTS_ACTIONS.FETCH_POSTS_PENDING
  };
}

export function fetchProductsError(
  error: UIServerMessages
): IfetchProductsError {
  return {
    type: POSTS_ACTIONS.FETCH_POSTS_ERROR,
    error
  };
}

export function addNewPost(post: SingleUIPostsResponse): IaddNewPost {
  return {
    type: POSTS_ACTIONS.ADD_NEW_POST,
    post
  };
}
