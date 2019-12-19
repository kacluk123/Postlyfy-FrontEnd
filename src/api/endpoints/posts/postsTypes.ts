export interface GetPostsPayload {
  limit: number;
  offset: number;
  tag: string;
}

export interface SingleServerPostsResponse {
  _id: string;
  createdBy: string;
  postContent: string;
  addedAt: string;
  comments: SingleServerResponseComment[];
}

export interface SingleServerResponseComment {
  addedAt: string;
  postId: string;
  author: string;
  content: string;
  _id: string;
}

export interface SingleServerResponseCommentPatch {
  isError: boolean;
  comment: SingleServerResponseComment;
}
export interface UIResponseComment {
  createdAt: string;
  author: string;
  content: string;
  postId: string;
  commentId: string;
}

export interface UIResponseCommentPatch {
  isError: boolean;
  comment: UIResponseComment;
}

export interface SingleUIPostsResponse {
  postId: string;
  author: string;
  content: string;
  createdAt: string;
  comments: UIResponseComment[];
}

export interface ServerPostsResponse {
  isError: boolean;
  posts: SingleServerPostsResponse[];
  total: number;
  offset: string;
  limit: string;
}

export interface UIPostsResponse {
  isError: boolean;
  postsList: SingleUIPostsResponse[];
  totalNumberOfPosts: number;
  offset: string;
  limit: string;
}

export interface IAddPostParams {
  postContent: string;
  tags: string[];
}

export interface IAddPostServerRequestParams {
  post: string;
  tags: string[];
}

export interface IAddCommentParams {
  comment: string;
}

export interface IAddCommentParams {
  comment: string;
}

export interface IAddCommentServerRequestParams {
  comment: string;
}
