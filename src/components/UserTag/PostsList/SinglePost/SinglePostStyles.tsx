import styled from "styled-components";

export const SinglePost = styled.div.attrs({
  className: "SinglePost"
})`
  width: 100%;
  min-height: 100px;
  background: #edecea;
  border-radius: 2px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas:
    "SinglePostUserAvatar SingleUserName" "SinglePostDate" "SinglePostDate"
    "SinglePostUserAvatar SinglePostContent" "SinglePostContent" "SinglePostContent";
`;

export const SinglePostUserAvatar = styled.div.attrs({
  className: "SinglePostUserAvatar"
})`
  grid-area: SinglePostDate;
`;

export const SinglePostDate = styled.div.attrs({
  className: "SinglePostDate"
})`
  grid-area: SinglePostUserAvatar;
`;

export const SinglePostContent = styled.div.attrs({
  className: "SinglePostContent"
})`
  grid-area: SinglePostContent;
`;

export const SingleUserName = styled.div.attrs({
  className: "SingleUserName"
})`
  grid-area: SingleUserName;
`;
