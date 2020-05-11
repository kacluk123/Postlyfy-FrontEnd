export interface PostInputActions {
  onSendPostButtonClick: () => void;
  setImage: ({ dataUrl, fileName }: { dataUrl: string | null, fileName: string }) => void;
  postInputValue: string;
  isSendPostButtonDisabled: boolean;
}
