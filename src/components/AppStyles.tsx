import styled from 'styled-components'

export const App = styled.div.attrs({
    className: 'App'
})`
    display: grid;
    grid-template-rows: 50px auto;
`

export const AppContent = styled.div.attrs({
    className: 'AppContent'
})`
    background: var(--dark);
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`