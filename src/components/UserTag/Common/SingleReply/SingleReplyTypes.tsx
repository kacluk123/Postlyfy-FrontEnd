export enum REPLY_TYPE {
  COMMENT = "comment",
  POST = "post",
  DEFAULT = "default"
}

export interface ISingleReply {
  author: string;
  createdAt: string;
  content: string | React.ReactNodeArray;
  children?: React.ReactChildren;
  type?: REPLY_TYPE;
}