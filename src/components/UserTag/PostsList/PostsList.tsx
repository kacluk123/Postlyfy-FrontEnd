import { useSelector, useDispatch } from "react-redux";
import {
  getPosts,
  getPostsPending,
  getTotalPosts
} from "../../../redux/reducers/postReducer";
import { AppState } from '../../../redux/store'
import { MAIN_API_URL } from '../../../api/axios-instances';
import openSocket from 'socket.io-client'
import Loader from "../../Common/Loader";
import fetchPostsTHUNK from "../../../redux/async/fetchPosts";
import { SingleUIPostsResponse } from "../../../api/endpoints/posts/postsTypes";
import * as React from "react";
import SinglePost from "./SinglePost";
import * as Styled from "./PostsListStyled";
import useWindowScroll from "../../../hooks/useWindowScroll";
import PostInput from "../PostInput";
import { useParams } from "react-router";
import { SinglePostReplyText } from './SinglePost/SinglePostStyles';

interface IPostsSocketIoData {
  action: 'create';
  getTotalNumberOfPostsInTag: number;
  serverTag: string;
}

const PostsListComponent = () => {
  const posts = useSelector(getPosts);
  const pending = useSelector(getPostsPending);
  const localTotalPostCount = useSelector(getTotalPosts);
  const [serverTotalPostCount, setServerTotalPostCount] = React.useState<number>(0);
  const dispatch = useDispatch();
  const isMaxScroll = useWindowScroll();
  const [onScrollPending, setOnScrollPending] = React.useState<boolean>(false);
  const { tag } = useParams();
  const postListCountDifference = serverTotalPostCount - localTotalPostCount;

  React.useEffect(() => {
    setServerTotalPostCount(0);
    const socket = openSocket(MAIN_API_URL);
    const socketCallback = (data: IPostsSocketIoData) => {
      if (data.action === 'create' && data.serverTag === tag) {
        setServerTotalPostCount(data.getTotalNumberOfPostsInTag);
      }
    };

    socket.on('posts', socketCallback);
   
    if (tag) {
      dispatch(
        fetchPostsTHUNK({
          offset: 0,
          limit: 10,
          postsModifyType: 'initial',
          tag
        })
      );
    }
    return () => {
      socket.off('posts', socketCallback);
    };
  }, []);

  React.useEffect(() => {
    setServerTotalPostCount(0);
    const socket = openSocket(MAIN_API_URL);
    const socketCallback = (data: IPostsSocketIoData) => {
      if (data.action === 'create' && data.serverTag === tag) {
        setServerTotalPostCount(data.getTotalNumberOfPostsInTag);
      }
    };

    socket.on('posts', socketCallback);
   
    if (tag) {
      dispatch(
        fetchPostsTHUNK({
          offset: 0,
          limit: 10,
          postsModifyType: 'initial',
          tag
        })
      );
    }
    return () => {
      socket.off('posts', socketCallback);
    };
  }, [tag]);

  React.useEffect(() => {
    if (isMaxScroll && posts.length !== localTotalPostCount) {
      setOnScrollPending(true);
      try {
        if (tag) {
          dispatch(
            fetchPostsTHUNK({
              limit: 10,
              offset: posts.length,
              postsModifyType: 'loadMore',
              tag
            })
          );
        }
      } finally {
        setOnScrollPending(false);
      }
    }
  }, [isMaxScroll]);
  
  const LoadMoreComments = () => {
    if (tag) {
      dispatch(
        fetchPostsTHUNK({
          limit: postListCountDifference,
          offset: 0,
          postsModifyType: 'loadNew',
          tag
        })
      );
    }
  };

  if (pending) {
    return <Loader />;
  }

  return (
    <Styled.Posts>
      <Styled.PostsListContainer>
        <PostInput tag={tag} />
        {postListCountDifference > 0 && <Styled.LoadMorePosts onClick={LoadMoreComments}>
          <Styled.PostsListNewPostsCount>
          {postListCountDifference}&nbsp;
          </Styled.PostsListNewPostsCount>incoming posts. Click here to load.
        </Styled.LoadMorePosts>}
        <Styled.PostsList>
          {posts.map(
            ({
              postId,
              ...params
            }: SingleUIPostsResponse) => (
              <SinglePost
                key={postId}
                postId={postId}
                {...params}
              />
            )
          )}
          {onScrollPending && <Loader />}
        </Styled.PostsList>
      </Styled.PostsListContainer>
    </Styled.Posts>
  );
};

export default PostsListComponent;
