import * as React from "react";
import * as Styled from "./SinglePostStyles";
import { SingleUIPostsResponse } from "../../../../api/endpoints/posts/postsTypes";

const SinglePostComponent = ({
  author,
  postId,
  content,
  createdAt
}: SingleUIPostsResponse) => {
  return (
    <Styled.SinglePost>
      <Styled.SingleUserName>{author}</Styled.SingleUserName>
      <Styled.SinglePostUserAvatar>avek</Styled.SinglePostUserAvatar>
      <Styled.SinglePostDate>{createdAt}</Styled.SinglePostDate>
      <Styled.SinglePostContent>{content}</Styled.SinglePostContent>
    </Styled.SinglePost>
  );
};

export default SinglePostComponent;
