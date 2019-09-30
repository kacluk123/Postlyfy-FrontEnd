import { connect } from "react-redux";
import { useSelector } from "react-redux";
import {
  getProducts,
  getProductsPending
} from "../../redux/reducers/postReducer";
import fetchPosts from "../../../redux/async/fetchPosts";
import * as React from "react";
import * as Styled from "./PostsListStyled";

const PostsListComponent = () => {
  const products = useSelector(getProducts);
  const pending = useSelector(getProductsPending);

  React.useEffect(() => {
    fetchPosts();
  }, []);

  return <Styled.PostsList></Styled.PostsList>;
};

export default PostsListComponent;
