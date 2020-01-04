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
  isAuth,
  isLiked,
  likesCount,
  onLikeButtonClick
}: Types.ISingleReply) => {
  const isLikeDisabled = !isAuth || !isLiked;
  const [isAnimateRunning, setAnimationRunning] = React.useState<boolean>(false);

  return (
    <Styled.SingleReply type={type}>
      {children}
      <Styled.SingleReplyUserName>{author}</Styled.SingleReplyUserName>
      <Styled.SingleReplyUserAvatarContainer type={type}>
        {avatar ? <Styled.SingleReplyUserAvatar src={avatar}/> : <Icon.User height="100%" width="100%" />}
      </Styled.SingleReplyUserAvatarContainer>
      <Styled.SingleReplyLikeButton>
        <Styled.SingleReplyLikeButtonIcon
          onAnimationEnd={() => setAnimationRunning(false)}
          isAnimateRunning={isAnimateRunning}>
          <ThumbUpIcon onClick={() => {
            setAnimationRunning(true);
            onLikeButtonClick();
          }} color={isLikeDisabled ? "disabled" : "primary"} />
        </Styled.SingleReplyLikeButtonIcon>
        <Styled.SingleReplyLikeCount>
          {likesCount}
        </Styled.SingleReplyLikeCount>
      </Styled.SingleReplyLikeButton>
      <Styled.SingleReplyDate>{createdAt}</Styled.SingleReplyDate>
      <Styled.SingleReplyContent>{content}</Styled.SingleReplyContent>
    </Styled.SingleReply>
  );
};

export default SingleReply;
