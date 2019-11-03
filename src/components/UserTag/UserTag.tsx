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
import { Route, Switch, Link } from "react-router-dom";
import { useParams, useRouteMatch } from "react-router";

const UserTagComponent = () => {
  const { path, url } = useRouteMatch();
  console.log(path, url);
  return (
    <Styled.UserTag>
      <PostInput />
      <Link to={`${url}/elo`}>elo</Link>
      <Switch>
        <Route path={`${path}/:tag`} component={PostsList} />
      </Switch>
    </Styled.UserTag>
  );
};

export default UserTagComponent;
