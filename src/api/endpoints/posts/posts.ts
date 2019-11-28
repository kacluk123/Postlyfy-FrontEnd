import { mainApi } from "../../axios-instances";
import { GetPostsPayload } from "./postsTypes";
import { postsUnpacker, addPostPacker, addCommentPacker } from "./postsMapper";
import {
  serverMessageUnpacker,
  UIServerMessages
} from "../common/errorDataUnpacker";
import * as Types from "./postsTypes";

const getPostsUrl = "/posts/get-posts";
const addPostUrl = "/posts/add-post";
const addCommentUrl = (postId: string) => `/posts/add-comment/${postId}`;

export const getPosts = async (
  payload: GetPostsPayload
): Promise<Types.UIPostsResponse | UIServerMessages> => {
  try {
    const { data } = await mainApi.post(getPostsUrl, payload);
    console.log(data);
    return postsUnpacker(data);
  } catch (err) {
    return serverMessageUnpacker(err.response.data);
  }
};

export const addPosts = async (payload: Types.IAddPostParams) => {
  try {
    await mainApi.post(addPostUrl, addPostPacker(payload), {
      withCredentials: true
    });
  } catch (err) {
    console.log(err);
  }
};

export const addComment = async (
  payload: Types.IAddCommentParams,
  postId: string
) => {
  console.log(payload);
  try {
    await mainApi.patch(addCommentUrl(postId), addCommentPacker(payload), {
      withCredentials: true
    });
  } catch (err) {
    console.log(err);
  }
};
