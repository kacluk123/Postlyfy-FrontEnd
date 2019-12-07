import { mainApi } from "../../axios-instances";
import {
  postsUnpacker,
  addPostPacker,
  addCommentPacker,
  singlePostUnpacker
} from "./postsMapper";
import {
  serverMessageUnpacker,
  UIServerMessages
} from "../common/errorDataUnpacker";
import * as Types from "./postsTypes";

const getPostsUrl = (tag: string) => `/posts/get-posts/${tag}`;
const addPostUrl = "/posts/add-post";
const addCommentUrl = (postId: string) => `/posts/add-comment/${postId}`;

export const getPosts = async (
  url: string,
  payload: Types.GetPostsPayload
): Promise<Types.UIPostsResponse | UIServerMessages> => {
  console.log(payload);
  try {
    const { data } = await mainApi.get(`${url}/${payload.tag}`, {
      params: {
        limit: payload.limit,
        offset: payload.offset
      }
    });
    console.log(data);
    return postsUnpacker(data);
  } catch (err) {
    return serverMessageUnpacker(err.response.data);
  }
};

export const addPosts = async (
  payload: Types.IAddPostParams
): Promise<Types.SingleUIPostsResponse> => {
  try {
    const { data } = await mainApi.post<Types.SingleServerPostsResponse>(
      addPostUrl,
      addPostPacker(payload),
      {
        withCredentials: true
      }
    );
    return singlePostUnpacker(data);
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
