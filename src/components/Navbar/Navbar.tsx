import * as React from 'react'
import * as Styled from './NavbarStyles'
import * as types from './NavbarTypes'

const routes: types.routeTypes = {
    HOME: '/',
    REGISTER: '/register',
    LOGIN: '/login',
}


const Navbar = ({ location }) => {
    
    const isRouteActive = (route: types.routeNames): boolean => location.pathname === route

    return (
        <Styled.Navbar>
            <Styled.NavbarLink to={routes.HOME} isActive={isRouteActive(routes.HOME)}>
                Posts
            </Styled.NavbarLink>
            <Styled.LinksGroup>
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
            </Styled.LinksGroup>
        </Styled.Navbar>
    )
}

export default Navbar