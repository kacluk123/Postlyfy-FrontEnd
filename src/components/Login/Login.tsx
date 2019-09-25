import * as React from 'react'
import * as Styled from './LoginStyles'
import StandardInput from '../Common/StandardInput/StandardInput';
import Button from '../Common/Button'
import ServerMessageViewComponent from '../Common/ServerMessageView'
import useForm from '../../hooks/useForm'
import * as API from '../../api/endpoints/auth/login/login'

const Login = () => {
    const { formValues, handleChangeFormValues, errorValues, onButtonClick, isButtonDisabled } = useForm({
        initialValues: {
            formPassword: '',
            formName: ''
        },
        validationRules: {
            formPassword: {
                required: true,
                minLength: 6,
            },
            formName: {
                required: true,
                minLength: 6,
            }
        }
    })

    const handleButtonClick = async () => {
        await API.login(formValues)
    }
    
    return (
        <Styled.Login>
            <StandardInput 
                name='formName' 
                label='Name'
                value={formValues.formName} 
                errorMessage={errorValues.formName}
                onChange={handleChangeFormValues}
            />
            <StandardInput 
                name='formPassword' 
                label='Password'
                type="password"
                value={formValues.formPassword} 
                errorMessage={errorValues.formPassword}
                onChange={handleChangeFormValues}
            />
            <Button 
                onClick={onButtonClick(handleButtonClick)}
                disabled={isButtonDisabled}
            >
                LOGIN
            </Button>
        </Styled.Login>
    )
}

export default Login