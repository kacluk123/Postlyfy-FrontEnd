import styled from "styled-components";

export const PostsListContainer = styled.div.attrs({
  className: "PostsListContainer"
})`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PostsList = styled.div.attrs({
  className: "PostsList"
})`
  width: 1000px;
  display: grid;
  grid-row-gap: 10px;
`;
