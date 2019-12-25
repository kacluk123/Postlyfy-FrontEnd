import * as React from "react";
import * as Styled from "./PostInputStyles";
import * as Types from "./PostInputTypes";
import * as API from "../../../api/endpoints/posts/posts";
import useForm from "../../../hooks/useForm";
import StandardTextArea from "../../Common/StandardTextArea";
import PostInputActions from "./PostInputActions";
import { useSelector, useDispatch } from "react-redux";
import { addNewPost } from '../../../redux/actions/postActions';
import { getUser } from '../../../redux/reducers/userReducer';

const hashTagsDirty = (value: string): RegExpMatchArray | [] => {
  const hashtagRegexp = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
  const hashTagArray = value.match(hashtagRegexp);

  return hashTagArray ? hashTagArray : [];
};

const deleteWhiteSpace = (arrayToRemoveWhiteSpaces: string[]): string[] =>
  arrayToRemoveWhiteSpaces.map((arrayItem: string) => arrayItem.trimLeft());

const getHashTags = (post: string): string[] =>
  deleteWhiteSpace(hashTagsDirty(post));

const PostInput = ({ tag }: Types.PostInput) => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const {
    formValues,
    handleChangeFormValues,
    onButtonClick,
    isButtonDisabled
  } = useForm({
    initialValues: {
      postInput: `
#${tag}
      `
    },
    validationRules: {
      postInput: {
        required: true,
        minLength: 6
      }
    }
  }, [tag]);

  React.useEffect(() => {
    textAreaRef.current?.focus();
  }, [tag]);

  const addPost = async () => {
    const post = await API.addPosts({
      postContent: formValues.postInput,
      tags: getHashTags(formValues.postInput)
    }, tag);

    post.author = user?.user.name;

    dispatch(addNewPost(post));
  };

  return (
    <Styled.PostInput>
      <StandardTextArea
        name="postInput"
        value={formValues.postInput}
        onChange={handleChangeFormValues}
        textAreaRef={textAreaRef}
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
