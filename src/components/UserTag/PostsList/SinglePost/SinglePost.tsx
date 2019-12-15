import * as React from "react";
import * as Styled from "./SinglePostStyles";
import { SingleUIPostsResponse } from "../../../../api/endpoints/posts/postsTypes";
import * as Icon from "../../../Common/Icons/Icons";
import moment from "moment";
import reactStringReplace from "react-string-replace";
import Comments from "./Comments";
import SingleReply from "../../Common/SingleReply";

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
  comments
}: SingleUIPostsResponse) => {
  const [isCommentInputShowed, setVisibilityOfCommentInput] = React.useState<
    boolean
  >(false);

  return (
    <SingleReply
      author={author}
      content={replaceHashTags(addNewLine(content))}
      createdAt={moment(createdAt).format("MMM Do YY")}
      type="post"
    >
      <Comments
        isCommentInputShowed={isCommentInputShowed}
        postId={postId}
        comments={comments}
      />
      <Styled.SinglePostReplyText
        onClick={() => setVisibilityOfCommentInput(visible => !visible)}
      >
        Reply
      </Styled.SinglePostReplyText>
    </SingleReply>
  );
};

export default SinglePostComponent;
