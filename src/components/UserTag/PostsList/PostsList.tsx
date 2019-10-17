import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  getProductsPending,
  getTotalPosts
} from "../../../redux/reducers/postReducer";

import fetchPostsTHUNK from "../../../redux/async/fetchPosts";
import { SingleUIPostsResponse } from "../../../api/endpoints/posts/postsTypes";
import * as React from "react";
import SinglePost from "./SinglePost";
import * as Styled from "./PostsListStyled";
import useWindowScroll from "../../../hooks/useWindowScroll";

type InfiniteScrollMainParams = {
  offset: number;
  limit: number;
};

const infiniteScrollMainParams = {
  offset: 0,
  limit: 20
};

const PostsListComponent = () => {
  const products = useSelector(getProducts);
  const pending = useSelector(getProductsPending);
  const total = useSelector(getTotalPosts);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchPostsTHUNK(infiniteScrollMainParams));
  }, []);

  const fetchPosts = (params: InfiniteScrollMainParams) => {
    const isPostsListNotFull = products.length !== total;
    console.log(isPostsListNotFull, products.length, total);
    // if (isPostsListNotFull) {
    dispatch(fetchPostsTHUNK(params));
    // }
  };
  console.log(products.length, total);
  useWindowScroll({
    ...infiniteScrollMainParams,
    callback: fetchPosts
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

export default PostsListComponent;
