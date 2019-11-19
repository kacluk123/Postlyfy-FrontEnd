import styled from "styled-components";
import { Link } from "react-router-dom";

export const TagsList = styled.div.attrs({
  className: "TagsList"
})`
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const HashtagLink = styled(Link).attrs({
  className: "HashtagLink"
})`
  color: #3f51b5;
  font-size: 35px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
