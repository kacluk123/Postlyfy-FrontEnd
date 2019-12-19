import {
  UIPostsResponse,
  SingleUIPostsResponse,
  UIResponseCommentPatch,
} from "../../api/endpoints/posts/postsTypes";
import { UIServerMessages } from "../../api/endpoints/common/errorDataUnpacker";

export enum POSTS_ACTIONS_NAMES {
  FETCH_POSTS_PENDING = "FETCH_PRODUCTS_PENDING",
  FETCH_POSTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS",
  FETCH_POSTS_ERROR = "FETCH_PRODUCTS_ERROR",
  ADD_NEW_POST = "ADD_NEW_POST",
  ADD_COMMENT_TO_POST = "ADD_COMMENT_TO_POST"
}

export interface IPostsBaseAction {
  type: POSTS_ACTIONS_NAMES;
}

export interface IfetchPostsPending extends IPostsBaseAction {
  type: POSTS_ACTIONS_NAMES.FETCH_POSTS_PENDING;
}

export interface IfetchProductsSuccess extends IPostsBaseAction {
  posts: UIPostsResponse;
  initial: boolean;
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

export interface IaddNewComment extends IPostsBaseAction {
  comment: UIResponseCommentPatch;
  type: POSTS_ACTIONS_NAMES.ADD_COMMENT_TO_POST;
}

export type PostsActions =
  | IfetchPostsPending
  | IfetchProductsSuccess
  | IaddNewPost
  | IfetchProductsError
  | IaddNewComment;

export function fetchProductsSuccess(
  posts: UIPostsResponse,
  initial: boolean
): IfetchProductsSuccess {
  return {
    type: POSTS_ACTIONS_NAMES.FETCH_POSTS_SUCCESS,
    initial,
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

export function addNewComment(comment: UIResponseCommentPatch): IaddNewComment {
  return {
    type: POSTS_ACTIONS_NAMES.ADD_COMMENT_TO_POST,
    comment
  };
}
