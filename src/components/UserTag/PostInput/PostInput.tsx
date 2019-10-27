import * as React from "react";
import * as Styled from "./PostInputStyles";
import * as Types from "./PostInputTypes";
import useForm from "../../../hooks/useForm";
import StandardTextArea from "../../Common/StandardTextArea";
import PostInputActions from "./PostInputActions";

const PostInput = ({  }: Types.PostInput) => {
  const {
    formValues,
    handleChangeFormValues,
    errorValues,
    onButtonClick,
    isButtonDisabled
  } = useForm({
    initialValues: {
      postInput: ""
    },
    validationRules: {
      postInput: {
        required: true,
        minLength: 6
      }
    }
  });

  return (
    <Styled.PostInput>
      <StandardTextArea
        name="postInput"
        value={formValues.postInput}
        onChange={handleChangeFormValues}
      />
      <PostInputActions
        postInputValue={formValues.postInput}
        onButtonClick={onButtonClick}
        isButtonDisabled={isButtonDisabled}
      />
    </Styled.PostInput>
  );
};

export default PostInput;
