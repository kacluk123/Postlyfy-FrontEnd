import * as React from "react";
import * as Styled from "./SinglePostStyles";
import { SingleUIPostsResponse } from "../../../../api/endpoints/posts/postsTypes";
import * as Icon from "../../../Common/Icons/Icons";
import moment from "moment";
import reactStringReplace from "react-string-replace";
import Comments from "./Comments";

const replaceHashTags = (content: string | React.ReactNodeArray) =>
  reactStringReplace(content, /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm, (match, i) => {
    console.log(match);
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
  createdAt
}: SingleUIPostsResponse) => {
  const [isCommentInputShowed, setVisibilityOfCommentInput] = React.useState<
    boolean
  >(false);

  return (
    <React.Fragment>
      <Styled.SinglePost>
        <Styled.SingleUserName>{author}</Styled.SingleUserName>
        <Styled.SinglePostUserAvatar>
          <Icon.User height="36px" width="36px" />
        </Styled.SinglePostUserAvatar>
        <Styled.SinglePostDate>
          {moment(createdAt).format("MMM Do YY")}
        </Styled.SinglePostDate>
        <Styled.SinglePostContent>
          {replaceHashTags(addNewLine(content))}
        </Styled.SinglePostContent>
        <Styled.SinglePostActions>
          <Styled.SinglePostReplyText
            onClick={() => setVisibilityOfCommentInput(visible => !visible)}
          >
            Reply
          </Styled.SinglePostReplyText>
        </Styled.SinglePostActions>
      </Styled.SinglePost>
      <Comments isCommentInputShowed={isCommentInputShowed} postId={postId} />
    </React.Fragment>
  );
};

export default SinglePostComponent;
