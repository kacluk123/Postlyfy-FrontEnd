import * as React from 'react';
import * as Styled from './PostInputFileUploadStyles';
import ImageIcon from '@material-ui/icons/Image';
import { uploadImage } from '../../../../../../api/endpoints/posts/posts'

// const toBase64 = (file: File) => new Promise((resolve, reject) => {
//   const reader = new FileReader();
//   reader.readAsDataURL(file);
//   reader.onload = () => resolve(reader.result);
//   reader.onerror = error => reject(error);
// });

const PostInputFileUpload = () => {
  const onFileDrop = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const data = new FormData();
      data.append('file', file);
      uploadImage(data);
    }
  };
  
  return (
    <Styled.PostInputFileUpload>
      <input type='file' onChange={onFileDrop} />
      <ImageIcon height='30px' width='30px' color="primary" />
    </Styled.PostInputFileUpload>
  );
};

export default PostInputFileUpload;