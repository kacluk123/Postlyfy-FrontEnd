import * as React from 'react';
import PostList from './PostsList'
import { Route, Switch } from "react-router-dom";
import * as Styled from './AppStyles'
import Login from './Login'
import Register from './Register'
import Navbar from './Navbar'
import { withRouter } from 'react-router-dom';

const NavbarWithRouter = withRouter(props => <Navbar {...props}/>);

const App = () => {
    
    return (
       <Styled.App>
           <NavbarWithRouter />
           <Styled.AppContent>
            <Switch>
                <Route exact path="/" component={PostList} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </Switch>
           </Styled.AppContent>
       </Styled.App>
    )
};


export default App