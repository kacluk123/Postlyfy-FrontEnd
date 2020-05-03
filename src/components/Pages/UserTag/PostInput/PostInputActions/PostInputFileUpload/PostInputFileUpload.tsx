import * as React from 'react';
import * as Styled from './PostInputFileUploadStyles';
import ImageIcon from '@material-ui/icons/Image';

const PostInputFileUpload = () => {
  return (
    <Styled.PostInputFileUpload>
      <input type='file' />
      <ImageIcon height='30px' width='30px' color="primary" />
    </Styled.PostInputFileUpload>
  );
};

export default PostInputFileUpload;