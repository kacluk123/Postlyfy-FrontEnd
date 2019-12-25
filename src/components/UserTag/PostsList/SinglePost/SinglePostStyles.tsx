import styled from "styled-components";
import { Link } from "react-router-dom";

export const HashtagLink = styled(Link).attrs({
  className: "HashtagLink"
})`
  text-decoration: none;
  color: #3f51b5;
`;

export const SinglePostReplyText = styled.div.attrs({
  className: "SinglePostReplyText"
})`
  opacity: 0.6;
  width: 100%;
  display: flex;
  justify-content: center;
  transition: 0.3s ease-in;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    opacity: 0.8;
  }
`;

export const SinglePost = styled.div.attrs({
  className: "SinglePost"
})`
  width: 100%;
  min-height: 140px;
  padding: 10px 20px 10px 20px;
  background: #edecea;
  border-radius: 2px;
  display: grid;
  grid-template-columns: 10% 10% 10% 1fr;
  grid-template-rows: max-content;
  grid-row-gap: 10px;
  grid-template-areas:
    "SinglePostUserAvatar SingleUserName SinglePostDate SinglePostDate"
    "SinglePostUserAvatar SinglePostContent SinglePostContent SinglePostContent"
    "SinglePostUserAvatar SinglePostActions SinglePostActions SinglePostActions"
    "SinglePostUserAvatar Comments Comments Comments";
`;

export const SinglePostUserAvatar = styled.div.attrs({
  className: "SinglePostUserAvatar"
})`
  grid-area: SinglePostUserAvatar;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SinglePostDate = styled.div.attrs({
  className: "SinglePostDate"
})`
  grid-area: SinglePostDate;
  font-size: 12px;
  font-weight: 400;
  color: var(--medium-grey);
  padding-top: 3px;
  border-bottom: 1px solid var(--tiny-grey);
`;

export const SinglePostContent = styled.div.attrs({
  className: "SinglePostContent"
})`
  grid-area: SinglePostContent;
  word-break: break-all;
`;

export const SingleUserName = styled.div.attrs({
  className: "SingleUserName"
})`
  grid-area: SingleUserName;
  color: var(--red-orange);
  font-weight: 400;
  border-bottom: 1px solid var(--tiny-grey);
`;

export const SinglePostActions = styled.div.attrs({
  className: "SinglePostActions"
})`
  grid-area: SinglePostActions;
`;
