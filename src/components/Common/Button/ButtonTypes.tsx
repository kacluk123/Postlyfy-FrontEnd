export interface StandardButton {
  isPending?: boolean;
  children: string;
  disabled?: boolean;
  testId?: string;
  onClick?: () => void;
  type?: 'button' | 'reset' | 'submit';
}
