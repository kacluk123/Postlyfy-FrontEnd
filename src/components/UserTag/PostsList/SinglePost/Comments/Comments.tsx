import * as React from "react";
import * as Styled from "./CommentsStyles";
import StandardTextArea from "../../../../Common/StandardTextArea";
import * as Types from "./CommentsTypes";
import * as API from "../../../../../api/endpoints/posts/posts";
import useForm from "../../../../../hooks/useForm";
import ReplyForm from "../../../Common/ReplyForm";
import SingleReply from "../../../Common/SingleReply";
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { addNewComment } from '../../../../../redux/actions/postActions';
const Comments = ({
  isCommentInputShowed,
  postId,
  comments
}: Types.IComments) => {
  const dispatch = useDispatch();
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
  }, []);

  const sendComment = async () => {
    const comment = await API.addComment({ comment: formValues.comment }, postId);
    console.log(comment)
    if (comment) {
      dispatch(addNewComment(comment));
    }
  };

  return (
    <Styled.Comments>
      {isCommentInputShowed && (
        <React.Fragment>
          <ReplyForm
            name="comment"
            handleSubmit={onButtonClick(sendComment)}
            isButtonDisable={isButtonDisabled}
            value={formValues.comment}
            onChange={handleChangeFormValues}
          />
        </React.Fragment>
      )}
      <Styled.CommentsList>
        {comments.map(({ content, createdAt, author, commentId }) => (
          <SingleReply
            key={commentId}
            createdAt={moment(createdAt).format("MMM DD YY")}
            author={author}
            content={content}
            type="default"
          />
        ))}
      </Styled.CommentsList>
    </Styled.Comments>
  );
};

export default Comments;
