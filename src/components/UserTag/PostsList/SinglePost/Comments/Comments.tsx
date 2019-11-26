import * as React from "react";
import * as Styled from "./CommentsStyles";
import StandardTextArea from "../../../../Common/StandardTextArea";
import * as Types from "./CommentsTypes";
import * as API from "../../../../../api/endpoints/posts/posts";
import useForm from "../../../../../hooks/useForm";

const Comments = ({ isCommentInputShowed, postId }: Types.IComments) => {
  const {
    formValues,
    handleChangeFormValues,
    onButtonClick,
    isButtonDisabled
  } = useForm({
    initialValues: {
      comment: ""
    },
    validationRules: {
      comment: {
        required: true,
        minLength: 6
      }
    }
  });
  const sendComment = async () => {
    await API.addComment({ comment: formValues.comment }, postId);
  };
  return (
    <Styled.Comments>
      {isCommentInputShowed && (
        <React.Fragment>
          <StandardTextArea
            name="comment"
            value={formValues.comment}
            onChange={handleChangeFormValues}
          />
          <button onClick={onButtonClick(sendComment)}>Send comment</button>
        </React.Fragment>
      )}
    </Styled.Comments>
  );
};

export default Comments;
