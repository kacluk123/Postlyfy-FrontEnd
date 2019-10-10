import {
  fetchProductsPending,
  fetchProductsSuccess
} from "../actions/postActions";
import { getPosts } from "../../api/endpoints/posts/posts";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

interface FetchPostsParams {
  offset: number;
  limit: number;
}

const fetchPosts = ({
  offset,
  limit
}: FetchPostsParams): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(fetchProductsPending());

    const data = await getPosts({ offset, limit });

    dispatch(fetchProductsSuccess(data));
  };
};

export default fetchPosts;
