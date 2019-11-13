import { mainApi } from "../../axios-instances";
import { tagsUnpacker } from "./tagsMapper";
import {
  serverMessageUnpacker,
  UIServerMessages
} from "../common/errorDataUnpacker";
import * as Types from "./tagsTypes";

const getTagsUrl = "/get-tags";

export const getTags = async (): Promise<
  Types.UIResponseTags | UIServerMessages
> => {
  try {
    const { data } = await mainApi.get<Types.ServerResponseTags>(getTagsUrl);
    return tagsUnpacker(data);
  } catch (err) {
    return serverMessageUnpacker(err.response.data);
  }
};
