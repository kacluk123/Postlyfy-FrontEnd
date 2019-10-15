import {
  UIPostsResponse,
  SingleUIPostsResponse
} from "../../api/endpoints/posts/postsTypes";

import { UIServerMessages } from "../../api/endpoints/common/errorDataUnpacker";

export enum POSTS_ACTIONS {
  FETCH_PRODUCTS_PENDING = "FETCH_PRODUCTS_PENDING",
  FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS",
  FETCH_PRODUCTS_ERROR = "FETCH_PRODUCTS_ERROR",
  ADD_NEW_POST = "ADD_NEW_POST"
}

export function fetchProductsPending() {
  return {
    type: POSTS_ACTIONS.FETCH_PRODUCTS_PENDING
  };
}

export function fetchProductsSuccess(products: UIPostsResponse) {
  return {
    type: POSTS_ACTIONS.FETCH_PRODUCTS_SUCCESS,
    payload: products
  };
}

export function fetchProductsError(error: UIServerMessages) {
  return {
    type: POSTS_ACTIONS.FETCH_PRODUCTS_ERROR,
    error
  };
}

export function addNewPost(post: SingleUIPostsResponse) {
  return {
    type: POSTS_ACTIONS.ADD_NEW_POST,
    payload: post
  };
}
