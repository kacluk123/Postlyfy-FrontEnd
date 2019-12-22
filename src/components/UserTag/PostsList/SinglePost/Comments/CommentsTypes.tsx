import { UIResponseComment } from "../../../../../api/endpoints/posts/postsTypes";

export interface IComments {
  isCommentInputShowed: boolean;
  postId: string;
  comments: UIResponseComment[];
  hideCommentInput: () => void;
}
