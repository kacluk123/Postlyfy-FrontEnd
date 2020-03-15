import * as React from 'react';
import * as Styled from './StandardInputStyles';
import * as types from './StandardInputTypes';

const StandardInputComponent = ({ value, label, name, onChange, errorMessage, testId, type = 'text'}: types.StandardInputProps) => (
    <Styled.StandardInputContainer>
        <Styled.StandardInput 
            value={value}
            label={label}
            name={name}
            type={type}
            inputProps={{ "data-testid": testId }}
            error={!!errorMessage}
            onChange={onChange}
        />
        <Styled.StandardInputErrorMessage>
            {errorMessage}
        </Styled.StandardInputErrorMessage>
    </Styled.StandardInputContainer>
);

export default StandardInputComponent;