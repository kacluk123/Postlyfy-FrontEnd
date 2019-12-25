import {
  fetchProductsPending,
  fetchProductsSuccess,
  fetchProductsError,
  addPostsTypes
} from "../actions/postActions";

import { getPosts } from "../../api/endpoints/posts/posts";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { UIPostsResponse } from "../../api/endpoints/posts/postsTypes";
import {
  UIServerMessages,
  isApiResonseHasError
} from "../../api/endpoints/common/errorDataUnpacker";

interface FetchPostsParams {
  offset: number;
  limit: number;
  postsModifyType: addPostsTypes;
  tag: string;
}

export const fetchPosts = ({
  offset,
  limit,
  postsModifyType,
  tag
}: FetchPostsParams): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    if (postsModifyType === 'initial') {
      dispatch(fetchProductsPending());
    }

    const data = await getPosts({ offset, limit, tag });
    
    if (isApiResonseHasError(data)) {
      dispatch(fetchProductsSuccess(data, postsModifyType));
    } else {
      dispatch(fetchProductsError(data));
    }
  };
};

export default fetchPosts;
