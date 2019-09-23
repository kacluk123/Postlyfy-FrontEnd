export interface StandardInputProps {
    value: string
    label: string
    name: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    errorMessage: string, 
    isValid?: boolean
}