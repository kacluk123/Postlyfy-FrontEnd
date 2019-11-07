import * as React from "react";
import UserTag from "./UserTag";
import { Route, Switch } from "react-router-dom";
import * as Styled from "./AppStyles";
import Login from "./Login";
import Register from "./Register";
import Navbar from "./Navbar";

const App = () => {
  return (
    <Styled.App>
      <Navbar />
      <Styled.AppContent>
        <Switch>
          <Route exact path="/posts" component={UserTag} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Styled.AppContent>
    </Styled.App>
  );
};

export default App;
