import * as React from "react";
import * as Styled from "./SingleReplyStyles";
import * as Types from "./SingleReplyTypes";
import * as Icon from "../../../Common/Icons/Icons";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const SingleReply = ({
  author,
  createdAt,
  content,
  children,
  type,
  avatar,
}: Types.ISingleReply) => {
  return (
    <Styled.SingleReply type={type}>
      {children}
      <Styled.SingleReplyUserName>{author}</Styled.SingleReplyUserName>
      <Styled.SingleReplyUserAvatarContainer type={type}>
      <Styled.SingleReplyLikeButton>
        <ThumbUpIcon color="primary" />
      </Styled.SingleReplyLikeButton>
        {avatar ? <Styled.SingleReplyUserAvatar src={avatar}/> : <Icon.User height="100%" width="100%" />}
      </Styled.SingleReplyUserAvatarContainer>
      <Styled.SingleReplyDate>{createdAt}</Styled.SingleReplyDate>
      <Styled.SingleReplyContent>{content}</Styled.SingleReplyContent>
    </Styled.SingleReply>
  );
};

export default SingleReply;
