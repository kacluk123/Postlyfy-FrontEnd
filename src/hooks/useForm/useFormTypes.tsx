export interface formErrorCreatorParams {
    errorMessage: string;
    isValid: boolean;
};

export interface formErrorCreatorOutput extends formErrorCreatorParams {};

export interface validationRules {
    required?: boolean;
    email?: boolean;
    minLength?: number;
}

export interface checkValidationOfInputParams {
    value: string;
    validationRules: validationRules;
    name: string;
};

export interface initialValues {
    [k: string]: string
}

export interface useFormParams {
    initialValues: initialValues
    validationRules: {
        [k: string]: validationRules
    }
}

export interface errorValues {
    [k: string]: string; 
}