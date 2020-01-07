import * as React from "react";
import * as Styled from "./SinglePostStyles";
import { SingleUIPostsResponse } from "../../../../api/endpoints/posts/postsTypes";
import { toggleLike, deletePost } from "../../../../api/endpoints/posts/posts";
import * as Icon from "../../../Common/Icons/Icons";
import moment from "moment";
import reactStringReplace from "react-string-replace";
import Comments from "./Comments";
import SingleReply from "../../Common/SingleReply";
import { useSelector, useDispatch } from 'react-redux';
import { getUser, isAuth } from '../../../../redux/reducers/userReducer';
import { togglePostLike, POSTS_ACTIONS_NAMES, deletePostAction } from '../../../../redux/actions/postActions';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const replaceHashTags = (content: string | React.ReactNodeArray) =>
  reactStringReplace(content, /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm, (match, i) => {
    return (
      <span>
        {" "}
        #
        <Styled.HashtagLink to={match} key={match + i}>
          {match}
        </Styled.HashtagLink>
      </span>
    );
  });

const addNewLine = (content: string | React.ReactNodeArray) =>
  reactStringReplace(content, /(\r\n|\n|\r)/gm, () => {
    return <br />;
  });

const SinglePostComponent = ({
  author,
  postId,
  content,
  createdAt,
  comments,
  commentsAddedInCurrentSession,
  totalComments,
  userPicture,
  likes,
  likesCount
}: SingleUIPostsResponse) => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const isUserAuth = useSelector(isAuth);
  const [isCommentInputShowed, setVisibilityOfCommentInput] = React.useState<
    boolean
  >(false);

  const hideCommentInput = React.useCallback(() => {
    setVisibilityOfCommentInput(false)
  }, []);

  const toggleSinglePostLike = async () => {
    if (user?.id) {
      dispatch(togglePostLike({
        userId: user?.id,
        postId,
      }));
    }
    await toggleLike(postId);
  };

  const deletePostFromList = async () => {
    try {
      await deletePost(postId);
      dispatch(deletePostAction(postId));
    } catch {
      console.log('failed to delete post')
    }
  };

  const isLikedByUser = user && likes.includes(user.id);

  return (
    <SingleReply
      author={author}
      content={replaceHashTags(addNewLine(content))}
      createdAt={moment(createdAt).format("MMM Do YY")}
      avatar={userPicture}
      isLiked={isLikedByUser}
      isAuth={isUserAuth}
      onLikeButtonClick={toggleSinglePostLike}
      likesCount={likesCount}
      type="post"
    >
      <Comments
        isCommentInputShowed={isCommentInputShowed}
        postId={postId}
        comments={comments}
        commentsAddedInCurrentSession={commentsAddedInCurrentSession}
        hideCommentInput={hideCommentInput}
        totalComments={totalComments}
      />
      <Styled.SinglePostReplyText
        onClick={() => setVisibilityOfCommentInput(visible => !visible)}
      >
        Reply
      </Styled.SinglePostReplyText>
      <DeleteOutlineIcon onClick={deletePostFromList} color='primary' />
    </SingleReply>
  );
};

export default SinglePostComponent;
