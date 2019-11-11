import {
  fetchProductsPending,
  fetchProductsSuccess,
  fetchProductsError
} from "../actions/postActions";

import { getPosts } from "../../api/endpoints/posts/posts";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { UIPostsResponse } from "../../api/endpoints/posts/postsTypes";
import { UIServerMessages } from "../../api/endpoints/common/errorDataUnpacker";

interface FetchPostsParams {
  offset: number;
  limit: number;
  initial: boolean;
  tag: string;
}

function isApiResonseHasError(
  data: UIPostsResponse | UIServerMessages
): data is UIPostsResponse {
  return !data.isError;
}

export const fetchPosts = ({
  offset,
  limit,
  initial,
  tag
}: FetchPostsParams): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    if (initial) {
      dispatch(fetchProductsPending());
    }

    const data = await getPosts({ offset, limit, tag });

    if (isApiResonseHasError(data)) {
      dispatch(fetchProductsSuccess(data, initial));
    } else {
      dispatch(fetchProductsError(data));
    }
  };
};

export default fetchPosts;
