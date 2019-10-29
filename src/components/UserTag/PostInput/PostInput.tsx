import * as React from "react";
import * as Styled from "./PostInputStyles";
import * as Types from "./PostInputTypes";
import * as API from "../../../api/endpoints/posts/posts";
import useForm from "../../../hooks/useForm";
import StandardTextArea from "../../Common/StandardTextArea";
import PostInputActions from "./PostInputActions";

const hashTagsDirty = (value: string): RegExpMatchArray | [] => {
  const hashtagRegexp = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
  const hashTagArray = value.match(hashtagRegexp);

  return hashTagArray ? hashTagArray : [];
};

const deleteWhiteSpace = (arrayToRemoveWhiteSpaces: string[]): string[] =>
  arrayToRemoveWhiteSpaces.map((arrayItem: string) => arrayItem.trimLeft());

const getHashTags = (post: string): string[] =>
  deleteWhiteSpace(hashTagsDirty(post));

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

  const addPost = async () => {
    await API.addPosts({
      post: formValues.postInput,
      tags: getHashTags(formValues.postInput)
    });
  };

  return (
    <Styled.PostInput>
      <StandardTextArea
        name="postInput"
        value={formValues.postInput}
        onChange={handleChangeFormValues}
      />
      <PostInputActions
        postInputValue={formValues.postInput}
        isSendPostButtonDisabled={isButtonDisabled}
        onSendPostButtonClick={onButtonClick(addPost)}
      />
    </Styled.PostInput>
  );
};

export default PostInput;
