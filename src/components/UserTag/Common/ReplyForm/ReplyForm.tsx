import * as React from "react";
import * as Styled from "./ReplyFormStyles";
import * as Types from "./ReplyFormTypes";
import StandardTextArea from "../../../Common/StandardTextArea";
import ReplyFormActions from "./ReplyFormActions";

const ReplyForm = ({
  handleSubmit,
  value,
  isButtonDisable,
  name,
  onChange
}: Types.IReplyForm) => {
  return (
    <Styled.ReplyForm
      onSubmit={event => {
        event.preventDefault();
        console.log("elo");
      }}
    >
      <Styled.ReplyFormContainer>
        <StandardTextArea name={name} value={value} onChange={onChange} />
        <ReplyFormActions value={value} isButtonDisabled={isButtonDisable} />
      </Styled.ReplyFormContainer>
    </Styled.ReplyForm>
  );
};

export default ReplyForm;
