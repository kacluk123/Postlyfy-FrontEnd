import * as React from "react";
import * as Styled from "./NavbarStyles";
import * as types from "./NavbarTypes";
import { isAuth } from '../../redux/reducers/userReducer';
import { useSelector } from 'react-redux';
import { useLocation } from "react-router";
import NavbarUserData from './NavbarUserData';

const routes: types.RouteTypes = {
  HOME: "/posts",
  REGISTER: "/register",
  LOGIN: "/login"
};

const Navbar = () => {
  const location = useLocation();
  const isUserAuth = useSelector(isAuth);
  const isRouteActive = (route: types.routeNames): boolean =>
    location.pathname === route;

  return (
    <Styled.Navbar>
      <Styled.NavbarLink to={routes.HOME} isActive={isRouteActive(routes.HOME)}>
        Posts
      </Styled.NavbarLink>
      <Styled.LinksGroup>
        {isUserAuth
          ? <NavbarUserData />
          : (
            <React.Fragment>
              <Styled.NavbarLink
                to={routes.LOGIN}
                isActive={isRouteActive(routes.LOGIN)}
              >
                Login
              </Styled.NavbarLink>
              <Styled.NavbarLink
                to={routes.REGISTER}
                isActive={isRouteActive(routes.REGISTER)}
              >
                Register
              </Styled.NavbarLink>
            </React.Fragment>
        )}
      </Styled.LinksGroup>
    </Styled.Navbar>
  );
};

export default Navbar;
