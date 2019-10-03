import { connect } from "react-redux";
import { useSelector } from "react-redux";
import {
  getProducts,
  getProductsPending
} from "../../../redux/reducers/postReducer";
import fetchPostsDispatch from "../../../redux/async/fetchPosts";
import { SingleUIPostsResponse } from "../../../api/endpoints/posts/postsTypes";
import * as React from "react";
import SinglePost from "./SinglePost";
import * as Styled from "./PostsListStyled";

const PostsListComponent = ({ fetchPosts }) => {
  const products = useSelector(getProducts);
  const pending = useSelector(getProductsPending);

  React.useEffect(() => {
    fetchPosts();
  }, []);

  if (pending) {
    return <span>Loading...</span>;
  }
  // console.log(products.postsList);
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

const mapDispatch = {
  fetchPosts: fetchPostsDispatch
};

export default connect(
  null,
  mapDispatch
)(PostsListComponent);
