import * as Types from './useFormTypes'
import { validateEmail } from './regex'

export const validateInput = (validationRules: Types.validationRules, value: string) => {
    if (validationRules.email) {
        if (!validateEmail(value)) {
            return "Must be an Email"
        }
    }

    if (validationRules.minLength) {
        const inputValueIsToShort = validationRules.minLength > value.length
        
        if (inputValueIsToShort) {
            return `Must be at least ${validationRules.minLength} characters long`
        }
    }
}