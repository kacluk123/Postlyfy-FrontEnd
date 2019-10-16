import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  getProductsPending
} from "../../../redux/reducers/postReducer";
import fetchPosts from "../../../redux/async/fetchPosts";
import { SingleUIPostsResponse } from "../../../api/endpoints/posts/postsTypes";
import * as React from "react";
import SinglePost from "./SinglePost";
import * as Styled from "./PostsListStyled";
import useWindowScroll from "../../../hooks/useWindowScroll";

const infiniteScrollMainParams = {
  offset: 0,
  limit: 20
};

const PostsListComponent = () => {
  const products = useSelector(getProducts);
  const pending = useSelector(getProductsPending);
  const dispatch = useDispatch();

  // const fetchPosts = () => useDispatch()(fetchPosts)

  // const fetchPosts = () => dispatch(fetchPosts(infiniteScrollMainParams));

  React.useEffect(() => {
    dispatch(fetchPosts(infiniteScrollMainParams));
  }, []);

  const x = React.useCallback(params => dispatch(fetchPosts(params)), []);

  useWindowScroll({
    ...infiniteScrollMainParams,
    callback: x
  });

  if (pending) {
    return <span>Loading...</span>;
  }

  return (
    <Styled.PostsList>
      {products.map(
        ({ postId, author, content, createdAt }: SingleUIPostsResponse) => (
          <SinglePost
            key={postId}
            postId={postId}
            author={author}
            content={content}
            createdAt={createdAt}
          />
        )
      )}
    </Styled.PostsList>
  );
};

// const mapDispatch = {
//   fetchPosts: fetchPostsDispatch
// };

export default PostsListComponent;
