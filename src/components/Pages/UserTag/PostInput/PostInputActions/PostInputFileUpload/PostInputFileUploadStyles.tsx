import styled from 'styled-components'

export const PostInputFileUpload = styled.label.attrs({
  className: 'PostInputFileUpload'
})`
  cursor: pointer;
  & {
    input[type="file"] {
      display: none;
    }
  }
`;