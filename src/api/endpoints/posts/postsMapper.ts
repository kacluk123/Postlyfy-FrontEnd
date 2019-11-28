import * as Types from "./postsTypes";

export const postsUnpacker = (
  response: Types.ServerPostsResponse
): Types.UIPostsResponse => ({
  postsList: response.posts.map((post: Types.SingleServerPostsResponse) =>
    singlePostUnpacker(post)
  ),
  totalNumberOfPosts: response.total,
  isError: response.isError
});

const singlePostUnpacker = (
  post: Types.SingleServerPostsResponse
): Types.SingleUIPostsResponse => ({
  postId: post._id,
  author: post.createdBy,
  content: post.postContent,
  createdAt: post.addedAt,
  comments: post.comments.map(comment => singleCommentUnpacker(comment))
});

export const addPostPacker = (
  payload: Types.IAddPostParams
): Types.IAddPostServerRequestParams => ({
  post: payload.postContent,
  tags: payload.tags
});

export const addCommentPacker = (
  payload: Types.IAddCommentParams
): Types.IAddCommentServerRequestParams => ({
  comment: payload.comment
});

export const singleCommentUnpacker = (
  payload: Types.SingleServerResponseComment
): Types.UIResponseComment => ({
  commentId: payload._id,
  content: payload.content,
  author: payload.author,
  createdAt: payload.addedAt
});
