import * as React from 'react'
import * as Styled from './StandardInputStyles'
import * as types from './StandardInputTypes'

const StandardInputComponent = ({ value, label, name, onChange, errorMessage }: types.StandardInputProps) => (
    <Styled.StandardInputContainer>
        <Styled.StandardInput 
            value={value}
            label={label}
            name={name}
            error={!!errorMessage}
            onChange={onChange}
        />
        <Styled.StandardInputErrorMessage>
            {errorMessage}
        </Styled.StandardInputErrorMessage>
    </Styled.StandardInputContainer>
)

export default StandardInputComponent