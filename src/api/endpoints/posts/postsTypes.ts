import { ISingleMatch } from '../../../redux/reducers/postsFilterReducer';

export interface GetPostsPayload {
  limit: number;
  offset: number;
  sorting: {
    sort: string[] | null;
    match: ISingleMatch[] | null;
  }
}

export interface SingleServerPostsResponse {
  _id: string;
  createdBy: string;
  postContent: string;
  addedAt: string;
  comments: SingleServerResponseComment[];
  totalComments: number;
  likes: string[];
  userPicture: string | null;
  likesCount: number;
}

export interface SingleUIPostsResponse {
  postId: string;
  author: string;
  content: string;
  likes: string[];
  likesCount: number;
  createdAt: string;
  userPicture: string | null;
  comments: UIResponseComment[];
  totalComments: number;
  commentsAddedInCurrentSession: UIResponseComment[];
}

export interface SingleServerResponseComment {
  _id: string;
  postId: string;
  commentData: {
    addedAt: string;
    content: string;
  };
  commentAuthor: {
    name: string;
    picture?: string;
  };
}
export interface SingleServerResponseCommentPatch {
  isError: boolean;
  comment: SingleServerResponseComment;
}
export interface UIResponseComment {
  commentId: string;
  postId: string;
  commentData: {
    addedAt: string;
    content: string;
  };
  commentAuthor: {
    name: string;
    picture: string | null;
  };
}

export interface UIResponseCommentPatch {
  isError: boolean;
  comment: UIResponseComment;
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

export interface IServerGetComments {
  isError: boolean;
  comments: SingleServerResponseComment[];
  postId: string;
}

export interface IUIGetComments {
  isError: boolean;
  comments: UIResponseComment[];
  postId: string;
}

export interface IGetCommentsParams {
  skip: number;
}
