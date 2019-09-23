import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { NavbarStyles } from './NavbarTypes'

const activeRouteorHoveredStyles = css`
    &:after {
            content: "";
            position: absolute;
            width: calc(100% + 10px);
            height: 2px;
            animation: LineWidth .1s linear;
            background: var(--red-orange);
            left: -5px;
            top: -5px;
        }

    &:before {
            content: "";
            position: absolute;
            width: calc(100% + 10px);
            height: 2px;
            animation: LineWidth .1s linear;
            background: var(--red-orange);
            bottom: -5px;
            right: -5px;
        }
` 

export const Navbar = styled.div.attrs({
    className: 'Navbar'
})`
    padding: 0 10px;
    background: var(--dark-grey);
    display: flex;
    border-bottom: 1px solid var(--color-white);
    align-items: center;
    justify-content: space-between;
`
export const LinksGroup = styled.div.attrs({
    className: 'NavbarLink'
})`
    display: grid;
    grid-column-gap: 30px;
    grid-auto-flow: column;
`

export const NavbarLink = styled(Link).attrs({
    className: 'NavbarLink'
})<NavbarStyles>`
    color: var(--color-white);
    text-decoration: none;
    font-size: 18px;
    position: relative;
    
    @keyframes LineWidth {
        0%  {
            width: 0;
        }

        100% {
            width: calc(100% + 10px);
        }
    }

    ${(props) => props.isActive && css`
        ${activeRouteorHoveredStyles}
    `}

    &:hover {
        ${activeRouteorHoveredStyles}
    }

`
