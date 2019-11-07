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
  createdAt: post.addedAt
});

export const addPostPacker = (
  payload: Types.IAddPostParams
): Types.IAddPostServerRequestParams => ({
  post: payload.postContent,
  tags: payload.tags
});
