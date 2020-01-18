import styled from 'styled-components';

export const SinglePostFilter = styled.div.attrs({
  className: 'SinglePostFilter'
})`
  height: 50px;
  width: 100px;
  background: white;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 2px;
  cursor: pointer;
`;

export const PostFilterContent = styled.div.attrs({
  className: 'PostFilterContent'
})`
  display: grid;
  justify-content: center;
  width: 100%;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  align-items: center;
`;

export const PostFilterText = styled.div.attrs({
  className: 'PostFilterText'
})``;

export const PostFilterIconContainer = styled.div.attrs({
  className: 'PostFilterIconContainer'
})`
  display: flex;
  align-items: center;
`;
