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
import PostInput from "../PostInput";
import { useParams } from "react-router";

const PostsListComponent = () => {
  const posts = useSelector(getProducts);
  const pending = useSelector(getProductsPending);
  const total = useSelector(getTotalPosts);
  const dispatch = useDispatch();
  const isMaxScroll = useWindowScroll();
  const [onScrollPending, setOnScrollPending] = React.useState<boolean>(false);
  const { tag } = useParams();
  React.useEffect(() => {
    if (tag) {
      dispatch(
        fetchPostsTHUNK({
          offset: 0,
          limit: 10,
          initial: true,
          tag
        })
      );
    }
  }, []);

  React.useEffect(() => {
    if (tag) {
      dispatch(
        fetchPostsTHUNK({
          offset: 0,
          limit: 10,
          initial: true,
          tag
        })
      );
    }
  }, [tag]);

  React.useEffect(() => {
    if (isMaxScroll && posts.length !== total) {
      setOnScrollPending(true);
      try {
        if (tag) {
          dispatch(
            fetchPostsTHUNK({
              limit: 10,
              offset: posts.length,
              initial: false,
              tag
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
    <Styled.Posts>
      <Styled.PostsListContainer>
        <PostInput tag={tag} />
        <Styled.PostsList>
          {posts.map(
            ({
              postId,
              author,
              content,
              createdAt,
              comments
            }: SingleUIPostsResponse) => (
              <SinglePost
                key={postId}
                postId={postId}
                author={author}
                content={content}
                createdAt={createdAt}
                comments={comments}
              />
            )
          )}
          {onScrollPending && <Loader />}
        </Styled.PostsList>
      </Styled.PostsListContainer>
    </Styled.Posts>
  );
};

export default PostsListComponent;
