import styled from "styled-components";
import { Link } from "react-router-dom";

export const TagsList = styled.div.attrs({
  className: "TagsList"
})``;

export const HashtagLink = styled(Link).attrs({
  className: "HashtagLink"
})`
  text-decoration: none;
  color: #3f51b5;
`;
