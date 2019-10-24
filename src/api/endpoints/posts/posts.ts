import { mainApi } from "../../axios-instances";
import { getPostsPayload } from "./postsTypes";
import { postsMapper } from "./postsMapper";
import {
  serverMessageUnpacker,
  UIServerMessages,
  serverMessagesResponse
} from "../common/errorDataUnpacker";
import * as Types from "./postsTypes";

const getPostsUrl = "/get-posts";
const addPostUrl = "/add-post";

export const getPosts = async (
  payload: getPostsPayload
): Promise<Types.UIPostsResponse | UIServerMessages> => {
  try {
    const { data } = await mainApi.post(getPostsUrl, payload);
    console.log(data);
    return postsMapper(data);
  } catch (err) {
    return serverMessageUnpacker(err.response.data);
  }
};

export const addPosts = async payload => {
  try {
    const { data } = await mainApi.post(addPostUrl, payload, {
      withCredentials: true
    });
  } catch (err) {
    console.log(err);
  }
};
