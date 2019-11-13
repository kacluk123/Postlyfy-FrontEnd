import * as React from "react";
import * as Styled from "./PostStyles";
import { getTags } from "../../api/endpoints/tags/tags";
import PostsList from "./PostsList";
import PostInput from "./PostInput";
import { Route, Switch, Link, useRouteMatch } from "react-router-dom";

const UserTagComponent = () => {
  const { path, url } = useRouteMatch();

  const a = async () => {
    const x = await getTags();
    console.log(x);
  };

  React.useEffect(() => {
    a();
  }, []);

  return (
    <Styled.UserTag>
      <PostInput />
      <Switch>
        <Route path={`${path}/:tag`} component={PostsList} />
      </Switch>
    </Styled.UserTag>
  );
};

export default UserTagComponent;
