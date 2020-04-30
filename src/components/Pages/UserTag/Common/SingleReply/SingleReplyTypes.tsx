export enum REPLY_TYPE {
  COMMENT = "comment",
  POST = "post",
  DEFAULT = "default"
}

export interface ISingleReply {
  author: string;
  createdAt: string;
  content: string | React.ReactNodeArray;
  children?: React.ReactNode;
  type: REPLY_TYPE;
  onLikeButtonClick?: () => void;
  avatar?: string | null;
  likesCount?: number;
  postId?: string;
  isLiked?: boolean;
  isAuth?: boolean;
  isPostDeleting?: boolean;
  isPostDeleted?: boolean;
  handleAnimationEnd?: () => void;
}
