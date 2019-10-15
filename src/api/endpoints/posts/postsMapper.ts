import * as Types from "./postsTypes";

export const postsMapper = (
  response: Types.ServerPostsResponse
): Types.UIPostsResponse => ({
  postsList: response.posts.map((post: Types.SingleServerPostsResponse) =>
    singlePostMapper(post)
  ),
  totalNumberOfPosts: response.total,
  isError: response.isError
});

const singlePostMapper = (
  post: Types.SingleServerPostsResponse
): Types.SingleUIPostsResponse => ({
  postId: post._id,
  author: post.createdBy,
  content: post.postContent,
  createdAt: post.addedAt
});
