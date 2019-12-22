import styled from "styled-components";

export const Posts = styled.div.attrs({
  className: "Posts"
})`
  width: 100%;
  min-height: calc(100vh - 50px);
  max-height: auto;
  display: flex;
  overflow: hidden;
  align-items: center;
  flex-direction: column;
`;

export const PostsList = styled.div.attrs({
  className: "PostsList"
})`
  margin-top: 50px;
  display: grid;
  width: 100%;
  grid-row-gap: 10px;
`;

export const PostsListContainer = styled.div.attrs({
  className: "PostsListContainer"
})`
  width: 1000px;
`;
