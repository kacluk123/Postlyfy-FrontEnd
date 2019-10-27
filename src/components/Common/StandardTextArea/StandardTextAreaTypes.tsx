export interface StandardTextArea {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  name: string;
}
