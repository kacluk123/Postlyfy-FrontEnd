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
}

export interface SingleUIPostsResponse {
  postId: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface ServerPostsResponse {
  isError: boolean;
  posts: SingleServerPostsResponse[];
  total: number;
}

export interface UIPostsResponse {
  isError: boolean;
  postsList: SingleUIPostsResponse[];
  totalNumberOfPosts: number;
}

export interface IAddPostParams {
  postContent: string;
  tags: string[];
}

export interface IAddPostServerRequestParams {
  post: string;
  tags: string[];
}
