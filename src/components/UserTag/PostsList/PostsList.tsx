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
import useSWR, { mutate } from "swr";
import { getPosts } from "../../../api/endpoints/posts/posts";

const PostsListComponent = () => {
  // const products = useSelector(getProducts);
  const pending = useSelector(getProductsPending);
  // const total = useSelector(getTotalPosts);
  // const dispatch = useDispatch();
  const isMaxScroll = useWindowScroll();
  const [onScrollPending, setOnScrollPending] = React.useState<boolean>(false);
  const { tag } = useParams();
  const params = React.useMemo(() => ({ tag, limit: 10, offset: 0 }), [tag]);
  const { data, error } = useSWR(["/posts/get-posts", params], getPosts);
  console.log(data);
  // React.useEffect(() => {
  //   if (tag) {
  //     dispatch(
  //       fetchPostsTHUNK({
  //         offset: 0,
  //         limit: 20,
  //         initial: true,
  //         tag
  //       })
  //     );
  //   }
  // }, []);

  // React.useEffect(() => {
  //   if (tag) {
  //     dispatch(
  //       fetchPostsTHUNK({
  //         offset: 0,
  //         limit: 20,
  //         initial: true,
  //         tag
  //       })
  //     );
  //   }
  // }, [tag]);

  React.useEffect(() => {
    if (isMaxScroll && data.postsList.length !== data.totalNumberOfPosts) {
      setOnScrollPending(true);
      console.log("dadas");
      try {
        async () => {
          console.log("eee");
          const posts = await getPosts("/posts/get-posts", params);

          mutate("/api/user", {
            ...data,
            postsList: [data.postsList, posts.postsList]
          });
        };
      } finally {
        setOnScrollPending(false);
      }
    }
  }, [isMaxScroll]);

  if (!data) {
    return <Loader />;
  }

  return (
    <Styled.Posts>
      <Styled.PostsListContainer>
        <PostInput />
        <Styled.PostsList>
          {data.postsList.map(
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
          )}
          {onScrollPending && <Loader />}
        </Styled.PostsList>
      </Styled.PostsListContainer>
    </Styled.Posts>
  );
};

export default PostsListComponent;
