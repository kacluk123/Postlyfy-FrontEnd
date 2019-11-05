export interface SingleServerMessage {
  value: string;
  msg: string;
  param: string;
  location: string;
}

export interface ServerMessagesResponse {
  isError: boolean;
  messages: SingleServerMessage[];
}

export interface UIServerMessages {
  isError: boolean;
  messages: string[];
}

export const serverMessageUnpacker = (
  serverMessageList: ServerMessagesResponse
): UIServerMessages => {
  return {
    isError: serverMessageList.isError,
    messages: serverMessageList.messages.map(
      (message: SingleServerMessage) => message.msg
    )
  };
};
