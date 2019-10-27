import styled from "styled-components";

export const PostInput = styled.div.attrs({
  className: "PostInput"
})`
  width: 100%;
  background: var(--grey-special);
  display: grid;
  padding: 15px;
  grid-row-gap: 10px;
  grid-template-rows: auto 50px;

  & {
    textarea {
      resize: vertical;
    }
  }
`;
