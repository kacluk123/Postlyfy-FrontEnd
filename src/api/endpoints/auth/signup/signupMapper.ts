import { UISignupFormData, serverSignupFormData } from './signupTypes'

export const packSignupFormData = (payload: UISignupFormData): serverSignupFormData => {
    return {
        name: payload.formName,
        email: payload.formEmail,
        password: payload.formPassword
    }
}