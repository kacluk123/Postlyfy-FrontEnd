import { mainApi } from "../../axios-instances";
import {
  postsUnpacker,
  addPostPacker,
  addCommentPacker,
  singlePostUnpacker,
  commentsUnpacker,
  singleCommentUnpacker,
  singleCommentUnpackerPatch
} from "./postsMapper";
import {
  serverMessageUnpacker,
  UIServerMessages
} from "../common/errorDataUnpacker";
import * as Types from "./postsTypes";

const getPostsUrl = (tag: string) => `/posts/get-posts/${tag}`;
const addPostUrl = (tag: string) => `/posts/add-post/${tag}`;
const addCommentUrl = (postId: string) => `/posts/add-comment/${postId}`;
const getCommentsURL = (postId: string) => `/posts/comments/${postId}`;

export const getPosts = async (
  payload: Types.GetPostsPayload
): Promise<Types.UIPostsResponse | UIServerMessages> => {
  try {
    const { data } = await mainApi.get(getPostsUrl(payload.tag), {
      params: {
        limit: payload.limit,
        offset: payload.offset
      }
    });

    return postsUnpacker(data);
  } catch (err) {
    return serverMessageUnpacker(err.response.data);
  }
};

export const addPosts = async (
  payload: Types.IAddPostParams,
  tag: string
): Promise<Types.SingleUIPostsResponse> => {
  try {
    const { data } = await mainApi.post<Types.SingleServerPostsResponse>(
      addPostUrl(tag),
      addPostPacker(payload),
      {
        withCredentials: true
      }
    );
    return singlePostUnpacker(data);
  } catch (err) {
    return err;
  }
};

export const addComment = async (
  payload: Types.IAddCommentParams,
  postId: string
) => {
  try {
    const { data } = await mainApi.patch<Types.SingleServerResponseCommentPatch>(
    addCommentUrl(postId), addCommentPacker(payload), {
      withCredentials: true
    });
    return singleCommentUnpackerPatch(data);
  } catch (err) {
    console.log(err);
  }
};

export const getComments = async (
  postId: string,
  payload: Types.IGetCommentsParams,
): Promise<Types.IUIGetComments> => {
  try {
    const { data } = await mainApi.get<Types.IServerGetComments>(getCommentsURL(postId), {
      params: {
        skip: payload.skip,
      }
    });
    return commentsUnpacker(data);
  } catch (err) {
    return err;
  }
}