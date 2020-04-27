
import * as React from "react";
import * as Styled from "./PostsListStyled";
import Loader from "../../../Common/Loader";
import SinglePost from "./SinglePost";
import useWindowScroll from "../../../../hooks/useWindowScroll";
import PostInput from "../PostInput";
import usePostsList from './usePostsList';
import PostsFilters from './PostsFilters';
import { useParams } from "react-router";
import { getSorting } from '../../../../redux/reducers/postsFilterReducer';
import { useSelector, useDispatch } from "react-redux";
import posed, { PoseGroup } from 'react-pose';
import {
  getPosts,
  getPostsPending,
} from "../../../../redux/reducers/postReducer";
import { resetPosts } from '../../../../redux/actions/postActions';

const AnimatedItem = posed.li({
  enter: { opacity: 1 },
  exit: { opacity: 0 }
});

const PostsListComponent = () => {
  const posts = useSelector(getPosts);
  const pending = useSelector(getPostsPending);
  const sorting = useSelector(getSorting);
  const isMaxScroll = useWindowScroll();
  const dispatch = useDispatch();
  const { tag } = useParams<{tag: string}>();
  const {
    LoadMorePosts,
    onSortingChange,
    onTagPostLoad,
    onMaxScroll,
    onScrollPending,
    postListCountDifference
  } = usePostsList();
  React.useEffect(() => {
    return () => {
      dispatch(resetPosts());
    }
  }, []);

  React.useEffect(() => {
    onTagPostLoad(tag);
  }, [tag]);

  React.useEffect(() => {
    onSortingChange();
  }, [sorting]);

  React.useEffect(onMaxScroll, [isMaxScroll]);

  const postsList = posts.map(
    ({
      postId,
      ...params
    }) => (
      <AnimatedItem key={postId}>
        <SinglePost
          postId={postId}
          {...params}
        />
      </AnimatedItem>
    )
  );
  
  if (pending) {
    return <Loader />;
  }

  return (
    <Styled.Posts>
      <Styled.PostsListContainer>
        <PostInput tag={tag} />
        <PostsFilters />
        {postListCountDifference > 0 && <Styled.LoadMorePosts onClick={() => { LoadMorePosts(tag);}}>
          <Styled.PostsListNewPostsCount>
          {postListCountDifference}&nbsp;
          </Styled.PostsListNewPostsCount>incoming posts. Click here to load.
        </Styled.LoadMorePosts>}
        <Styled.PostsList>
          <PoseGroup>
            {postsList}
          </PoseGroup>
          {onScrollPending && <Loader />}
        </Styled.PostsList>
      </Styled.PostsListContainer>
    </Styled.Posts>
  );
};

export default PostsListComponent;
