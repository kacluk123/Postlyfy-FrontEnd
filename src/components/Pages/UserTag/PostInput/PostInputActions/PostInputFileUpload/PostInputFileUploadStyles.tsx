import styled from 'styled-components'

export const PostInputFileUpload = styled.label.attrs({
  className: 'PostInputFileUpload'
})`
  cursor: pointer;
  & {
    input[type="file"] {
      visibility: hidden;
      width: 0;
    }
  }
`;