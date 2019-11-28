import * as React from "react";
import * as Styled from "./SingleReplyStyles";
import * as Types from "./SingleReplyTypes";
import * as Icon from "../../../Common/Icons/Icons";

const SingleReply = ({
  author,
  createdAt,
  content,
  children,
  type
}: Types.ISingleReply) => {
  return (
    <Styled.SingleReply type={type}>
      {children}
      <Styled.SingleReplyUserName>{author}</Styled.SingleReplyUserName>
      <Styled.SingleReplyUserAvatar>
        <Icon.User height="36px" width="36px" />
      </Styled.SingleReplyUserAvatar>
      <Styled.SingleReplyDate>{createdAt}</Styled.SingleReplyDate>
      <Styled.SingleReplyContent>{content}</Styled.SingleReplyContent>
    </Styled.SingleReply>
  );
};

export default SingleReply;
