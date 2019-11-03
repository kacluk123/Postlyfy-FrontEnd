import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  getProductsPending,
  getTotalPosts
} from "../../../redux/reducers/postReducer";
import Loader from "../../Common/Loader";
import fetchPostsTHUNK from "../../../redux/async/fetchPosts";
import { SingleUIPostsResponse } from "../../../api/endpoints/posts/postsTypes";
import * as React from "react";
import SinglePost from "./SinglePost";
import * as Styled from "./PostsListStyled";
import useWindowScroll from "../../../hooks/useWindowScroll";
import { useParams } from "react-router";

const PostsListComponent = () => {
  const products = useSelector(getProducts);
  const pending = useSelector(getProductsPending);
  const total = useSelector(getTotalPosts);
  const dispatch = useDispatch();
  const isMaxScroll = useWindowScroll();
  const [onScrollPending, setOnScrollPending] = React.useState<boolean>(false);
  const { tag } = useParams();

  React.useEffect(() => {
    console.log("ELO");
    if (tag) {
      dispatch(
        fetchPostsTHUNK({
          offset: 0,
          limit: 20,
          initial: true,
          tag: tag
        })
      );
    }
  }, []);

  React.useEffect(() => {
    if (isMaxScroll && products.length !== total) {
      setOnScrollPending(true);
      try {
        if (tag) {
          dispatch(
            fetchPostsTHUNK({
              limit: 20,
              offset: products.length,
              initial: false,
              tag: tag
            })
          );
        }
      } finally {
        setOnScrollPending(false);
      }
    }
  }, [isMaxScroll]);

  if (pending) {
    return <Loader />;
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
      {onScrollPending && <Loader />}
    </Styled.PostsList>
  );
};

export default PostsListComponent;
