import styled from 'styled-components'

export const Register = styled.div.attrs({
    className: 'Register'
})`
    width: 300px;
    height: 600px;
    grid-template-rows: repeat(4, max-content);
    display: grid;
    padding: 15px;
    border-radius: 5px;
    grid-row-gap: 30px;
    background: var(--medium-grey)
`