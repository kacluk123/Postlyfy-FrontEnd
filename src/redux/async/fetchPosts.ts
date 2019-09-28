import {
  fetchProductsPending,
  fetchProductsSuccess,
  fetchProductsError
} from "../actions/postActions";
import { getPosts } from "../../api/endpoints/posts/posts";

function fetchPosts() {
  return async dispatch => {
    dispatch(fetchProductsPending());
    const data = await getPosts({ offset: 0, limit: 9999 });
    dispatch(fetchProductsSuccess(data));
  };
}

export default fetchPosts;
