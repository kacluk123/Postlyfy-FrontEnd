import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  getProductsPending,
  getTotalPosts
} from "../../../redux/reducers/postReducer";
import Loader from "../../Common/Loader";
import fetchPostsTHUNK from "../../../redux/async/fetchPosts";
import { SingleUIPostsResponse } from "../../../api/endpoints/posts/postsTypes";
import * as React from "react";
import SinglePost from "./SinglePost";
import * as Styled from "./PostsListStyled";
import useWindowScroll from "../../../hooks/useWindowScroll";
import PostInput from "../PostInput";
import { useParams } from "react-router";
import useSWR, { useSWRPages } from "swr";
import { getPosts } from "../../../api/endpoints/posts/posts";
import useOnScreen from "../../../hooks/useOnScreen";

const PostsListComponent = () => {
  // const products = useSelector(getProducts);
  // const pending = useSelector(getProductsPending);
  // const total = useSelector(getTotalPosts);
  // const dispatch = useDispatch();
  // const isMaxScroll = useWindowScroll();
  // const [onScrollPending, setOnScrollPending] = React.useState<boolean>(false);
  // const params = React.useMemo(() => ({ tag, limit: 10, offset: 0 }), []);
  // const { data, error } = useSWR(["/posts/get-posts", params], getPosts);
  const { tag } = useParams();
  let total = 0;
  
  const { pages, isLoadingMore, loadMore } = useSWRPages(
    "get-posts",
    ({ offset, withSWR }) => {
      const params = React.useMemo(
        () => ({
          limit: 10,
          tag,
          offset: offset || 0
        }),
        [tag, offset]
      );

      const { data } = withSWR(useSWR(["/posts/get-posts", params], getPosts));
      console.log(data);
      if (!data) return null;

      const { postsList } = data;
      total = data.total
      return postsList.map(
        ({
          postId,
          author,
          content,
          createdAt,
          comments
        }: SingleUIPostsResponse) => (
          <SinglePost
            key={postId}
            postId={postId}
            author={author}
            content={content}
            createdAt={createdAt}
            comments={comments}
          />
        )
      );
    }, ({ data }) => {

      return data.offset >= data.totalNumberOfPosts ? null : data.offset + data.limit;
    },
    [tag]
  );
  console.log(pages);
  const $loadMoreButton = React.useRef(null);
  const isOnScreen = useOnScreen($loadMoreButton, "200px");

  React.useEffect(() => {
    if (isOnScreen) {
      loadMore();
    }
  }, [isOnScreen]);

  return (
    <Styled.Posts>
      <Styled.PostsListContainer>
        <PostInput 

        />
        <Styled.PostsList>
          {pages}
          {/* {onScrollPending && <Loader />} */}
          <button
            ref={$loadMoreButton}
            disabled={isLoadingMore}
            onClick={loadMore}
          >
            Load More Pokémon
          </button>
        </Styled.PostsList>
      </Styled.PostsListContainer>
    </Styled.Posts>
  );
};

export default React.memo(PostsListComponent);
