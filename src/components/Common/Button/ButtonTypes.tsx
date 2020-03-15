export interface StandardButton {
  isPending?: boolean;
  children: string;
  disabled?: boolean;
  testId?: string;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'reset' | 'submit';
}
