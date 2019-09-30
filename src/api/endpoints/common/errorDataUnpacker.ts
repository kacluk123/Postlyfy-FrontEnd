export interface singleServerMessage {
  value: string;
  msg: string;
  param: string;
  location: string;
}

export interface serverMessagesResponse {
  isError: boolean;
  messages: singleServerMessage[];
}

export interface UIServerMessages {
  isError: boolean;
  messages: string[];
}

export const serverMessageUnpacker = (
  serverMessageList: serverMessagesResponse
): UIServerMessages => {
  return {
    isError: serverMessageList.isError,
    messages: serverMessageList.messages.map(
      (message: singleServerMessage) => message.msg
    )
  };
};
