import * as React from "react";
import * as Types from "./ReplyFormActionsTypes";
import * as Styled from "./ReplyFormActionsStyles";
import Button from "../../../../Common/Button";

const ReplyFormActions = ({ isButtonDisabled }: Types.PostInputActions) => {
  return (
    <Styled.ReplyFormActions>
      <Button disabled={isButtonDisabled}>Send</Button>
    </Styled.ReplyFormActions>
  );
};

export default ReplyFormActions;
