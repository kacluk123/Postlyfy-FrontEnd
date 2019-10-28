import * as React from "react";
import * as Types from "./PostInputActionsTypes";
import * as Styled from "./PostInputActionsStyles";
import Button from "../../../Common/Button";
import * as API from "../../../../api/endpoints/posts/posts";

const PostInputActions = ({
  onSendPostButtonClick,
  postInputValue,
  isSendPostButtonDisabled
}: Types.PostInputActions) => {
  return (
    <Styled.PostInputActions>
      <Button
        onClick={onSendPostButtonClick}
        disabled={isSendPostButtonDisabled}
      >
        Send
      </Button>
    </Styled.PostInputActions>
  );
};

export default PostInputActions;
