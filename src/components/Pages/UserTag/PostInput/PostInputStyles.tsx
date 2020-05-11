import styled from "styled-components";

export const PostInput = styled.div.attrs({
  className: "PostInput"
})`
  width: 100%;
  margin-top: 30px;
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

export const ImagePreview = styled.img.attrs({
  className: 'ImagePreview'
})`
  width: 50px;
  height: 50px;
`;

export const ImagePreviewContainer = styled.div.attrs({
  className: 'ImagePreviewContainer'
})`
  display: grid;
  align-items: flex-end;
  grid-auto-flow: column;
  grid-column-gap: 10px;
  grid-auto-columns: max-content;
`;

export const ImagePreviewImageName = styled.div.attrs({
  className: 'ImagePreviewImageName'
})`
  font-size: 14px;
  color: var(--medium-grey);
`;