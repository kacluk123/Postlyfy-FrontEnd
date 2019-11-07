import * as React from "react";
import * as Styled from "./SinglePostStyles";
import { SingleUIPostsResponse } from "../../../../api/endpoints/posts/postsTypes";
import * as Icon from "../../../Common/Icons/Icons";
import moment from "moment";
import reactStringReplace from "react-string-replace";

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
  createdAt
}: SingleUIPostsResponse) => {
  return (
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
    </Styled.SinglePost>
  );
};

export default SinglePostComponent;
