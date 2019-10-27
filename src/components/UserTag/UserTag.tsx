import * as React from "react";
import * as Styled from "./PostStyles";
import { useEffect } from "react";
import { addNewPost } from "../../redux/actions/postActions";
import { connect } from "react-redux";
import fetchPosts from "../../redux/async/fetchPosts";
import { useDispatch } from "react-redux";
import io from "socket.io-client";
import { MAIN_API_URL } from "../../api/axios-instances";
import { addPosts } from "../../api/endpoints/posts/posts";
import PostsList from "./PostsList";
import PostInput from "./PostInput";

const socket = io(MAIN_API_URL);
const POST = "post";

const UserTagComponent = ({ fetchPosts }) => {
  const dispatch = useDispatch();
  const [text, setText] = React.useState("");
  useEffect(() => {
    socket.on(POST, data => {
      dispatch(addNewPost(data.post));
    });
  }, []);

  const handleChange = event => {
    const value = event.target.value;

    setText(value);
  };

  const handleClick = async () => {
    await addPosts({
      post: text,
      userName: "elo"
    });
  };

  return (
    <Styled.UserTag>
      <PostInput />
      {/* <input type="text" onChange={handleChange} /> */}
      <button onClick={handleClick}>KLIKNIJ</button>
      <PostsList />
    </Styled.UserTag>
  );
};

export default UserTagComponent;
