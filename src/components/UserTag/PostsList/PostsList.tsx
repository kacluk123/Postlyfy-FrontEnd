import { useSelector, useDispatch } from "react-redux";
import {
  getPosts,
  getPostsPending,
  getTotalPosts
} from "../../../redux/reducers/postReducer";
import { MAIN_API_URL } from '../../../api/axios-instances';
import openSocket from 'socket.io-client';
import Loader from "../../Common/Loader";
import fetchPostsTHUNK from "../../../redux/async/fetchPosts";
import * as React from "react";
import SinglePost from "./SinglePost";
import * as Styled from "./PostsListStyled";
import useWindowScroll from "../../../hooks/useWindowScroll";
import PostInput from "../PostInput";
import { useParams } from "react-router";
import { getSorting, getSortingType } from '../../../redux/reducers/postsFilterReducer';
import { resetPosts } from '../../../redux/actions/postActions';
import { changeAllSorting } from '../../../redux/actions/postsFiltersActions';
import PostsFilters from './PostsFilters';

interface IPostsSocketIoData {
  action: 'create';
  getTotalNumberOfPostsInTag: number;
  serverTag: string;
}

const PostsListComponent = () => {
  const posts = useSelector(getPosts);
  const pending = useSelector(getPostsPending);
  const sorting = useSelector(getSorting);
  const localTotalPostCount = useSelector(getTotalPosts);
  const [serverTotalPostCount, setServerTotalPostCount] = React.useState<number>(0);
  const dispatch = useDispatch();
  const isMaxScroll = useWindowScroll();
  const sortingType = useSelector(getSortingType);

  const [onScrollPending, setOnScrollPending] = React.useState<boolean>(false);
  const { tag } = useParams<{tag: string}>();
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
    dispatch(
      changeAllSorting({
        sort: ['-addedAt'],
        match: {
          tags: tag
        },
        sortingType: 'newest',
      })
    );
    return () => {
      socket.off('posts', socketCallback);
      dispatch(resetPosts());
    };
  }, []);

  React.useEffect(() => {
    setServerTotalPostCount(0);
    dispatch(
      fetchPostsTHUNK({
        offset: 0,
        limit: 10,
        postsModifyType: 'initial',
        sorting: {
          match: sorting.match,
          sort: sorting.sort
        },
      })
    );
  }, [sorting]);

  React.useEffect(() => {
    if (isMaxScroll && posts.length !== localTotalPostCount) {
      setOnScrollPending(true);
      try {
          dispatch(
            fetchPostsTHUNK({
              limit: 10,
              offset: posts.length,
              postsModifyType: 'loadMore',
              sorting
            })
          );
      } finally {
        setOnScrollPending(false);
      }
    }
  }, [isMaxScroll]);
  
  const LoadMoreComments = () => {
      if (sortingType === 'newest') {
        dispatch(
          fetchPostsTHUNK({
            limit: postListCountDifference,
            offset: 0,
            postsModifyType: 'loadNew',
            sorting
          })
        );
      } else {
        dispatch(
          changeAllSorting({
            sort: ['-addedAt'],
            match: {
              tags: tag
            },
            sortingType: 'newest',
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
        <PostsFilters />
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
            }) => (
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
