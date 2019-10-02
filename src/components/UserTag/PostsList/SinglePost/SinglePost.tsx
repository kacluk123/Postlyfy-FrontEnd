import * as React from "react";
import * as Styled from "./SinglePostStyles";
import { SingleUIPostsResponse } from "../../../../api/endpoints/posts/postsTypes";

const SinglePostComponent = ({
  author,
  postId,
  content,
  createdAt
}: SingleUIPostsResponse) => {
  return <Styled.SinglePost>{content}</Styled.SinglePost>;
};

export default SinglePostComponent;
