export interface StandardButton {
    isPending?: boolean
    children: string
    disabled: boolean
    onClick: () => void
}