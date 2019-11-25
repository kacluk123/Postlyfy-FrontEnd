import { mainApi } from "../../axios-instances";
import { GetPostsPayload } from "./postsTypes";
import { postsUnpacker, addPostPacker } from "./postsMapper";
import {
  serverMessageUnpacker,
  UIServerMessages
} from "../common/errorDataUnpacker";
import * as Types from "./postsTypes";

const getPostsUrl = "/posts/get-posts";
const addPostUrl = "/posts/add-post";

export const getPosts = async (
  payload: GetPostsPayload
): Promise<Types.UIPostsResponse | UIServerMessages> => {
  try {
    const { data } = await mainApi.post(getPostsUrl, payload);
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
