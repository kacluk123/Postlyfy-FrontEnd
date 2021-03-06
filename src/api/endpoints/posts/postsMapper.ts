import * as Types from "./postsTypes";

export const postsUnpacker = (
  response: Types.ServerPostsResponse
): Types.UIPostsResponse => {
  return {
    postsList: response.posts.map((post: Types.SingleServerPostsResponse) =>
      singlePostUnpacker(post)
    ),
    totalNumberOfPosts: response.total,
    offset: response.offset,
    limit: response.limit,
    isError: response.isError
  }
};

export const singlePostUnpacker = (
  post: Types.SingleServerPostsResponse
): Types.SingleUIPostsResponse => {
  return {
    postId: post._id,
    author: post.createdBy,
    content: post.postContent,
    createdAt: post.addedAt,
    comments: post.comments.map(comment => singleCommentUnpacker(comment)),
    commentsAddedInCurrentSession: [],
    totalComments: post.totalComments,
    userPicture: post.userPicture,
    likes: post.likes,
    likesCount: post.likesCount
  };
};

export const addPostPacker = (
  payload: Types.IAddPostParams
): Types.IAddPostServerRequestParams => ({
  post: payload.postContent,
  tags: payload.tags,
  postImage: payload.postImage
});

export const addCommentPacker = (
  payload: Types.IAddCommentParams
): Types.IAddCommentServerRequestParams => ({
  comment: payload.comment
});

export const singleCommentUnpacker = (
  payload: Types.SingleServerResponseComment
): Types.UIResponseComment => {
  return {
    commentId: payload._id,
    postId: payload.postId,
    commentAuthor: {
      name: payload.commentAuthor.name,
      picture: payload.commentAuthor.picture || ""
    },
    commentData: {
      addedAt: payload.commentData.addedAt,
      content: payload.commentData.content,
    }
  };
};

export const singleCommentUnpackerPatch = (
  payload: Types.SingleServerResponseCommentPatch
): Types.UIResponseCommentPatch => ({
  isError: payload.isError,
  comment: singleCommentUnpacker(payload.comment)
});

export const commentsUnpacker = (payload: Types.IServerGetComments): Types.IUIGetComments => ({
  isError: payload.isError,
  comments: payload.comments.map((comment: Types.SingleServerResponseComment) => singleCommentUnpacker(comment)),
  postId: payload.postId
});