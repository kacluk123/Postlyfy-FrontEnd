import * as React from 'react'
import * as Types from './useFormTypes'
import { validateInput } from './helperFunctions'
import { callbackify } from 'util'

const isFormDirty = (errorObject: Types.errorValues): boolean => {
    return Object.values(errorObject).some(error => {
        return error !== undefined
    })
}

function reducer(state, action) {
    switch (action.type) {
      case 'CHANGE_FORM_VALUE': {
        return {
            ...state,
            formValues: {
                ...state.formValues,
                [action.fieldName]: action.value 
            },
            errorValues: {
                ...state.errorValues,
                [action.fieldName]: validateInput(action.validationRules, action.value)
            }
        }
      }
      case 'VALIDATE_ALL_INPUTS': {
          return {
            ...state,  
            errorValues: action.errorValues
          }
      }
      case 'DISABLE_BUTTON' : {
          return {
            ...state,
            isButtonDisabled: true,
          }
      }
      case 'ENABLE_BUTTON' : {
        return {
          ...state,
          isButtonDisabled: false,
        }
      }   
      default:
        return state
    }
  }

const useForm = (form: Types.useFormParams) => {
    const firstUpdate = React.useRef(true);
    
    const initialState = {
        formValues: {
            ...form.initialValues
        },
        errorValues: {
            ...form.initialValues
        },
        isButtonDisabled: false
    }

    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        if (isFormDirty(state.errorValues)) {
            dispatch({ type: 'DISABLE_BUTTON'})
        } else {
            dispatch({ type: 'ENABLE_BUTTON'})
        }
    }, [state.errorValues])

    const handleChangeFormValues = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const inputName = event.target.name
        const value = event.target.value
        const validationRulesOfCurrentInput = form.validationRules[inputName]

        dispatch({ 
            type: 'CHANGE_FORM_VALUE', 
            fieldName: inputName, 
            value,
            validationRules: validationRulesOfCurrentInput
        })
    }

    const validateAllInputs = () => {
        const validatedInputs = Object.keys(state.formValues).reduce((prev, curr): Types.errorValues => {
            return {
                ...prev,
                [curr]: validateInput(form.validationRules[curr], state.formValues[curr])
            }
        }, {})

        dispatch({ 
            type: 'VALIDATE_ALL_INPUTS',
            errorValues: validatedInputs
        })
    }

    const onButtonClick = (callback) => () => {
        validateAllInputs()

        if (!isFormDirty(state.errorValues)) {
            callback()
        }
    }

    return { 
        formValues: state.formValues, 
        errorValues: state.errorValues,
        handleChangeFormValues,
        onButtonClick,
        isButtonDisabled: state.isButtonDisabled
    }
}

export default useForm