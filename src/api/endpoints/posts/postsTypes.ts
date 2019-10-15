export interface getPostsPayload {
  limit: number;
  offset: number;
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
