import * as React from "react";
import * as Styled from "./PostStyles";
import PostsList from "./PostsList";
import PostInput from "./PostInput";
import { Route, Switch, Link } from "react-router-dom";
import { useRouteMatch } from "react-router";

const UserTagComponent = () => {
  const { path, url } = useRouteMatch(undefined);
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
