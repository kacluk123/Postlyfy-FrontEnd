import * as React from 'react';
// import { wait, fireEvent } from '@testing-library/react';
import { Provider } from "react-redux";
import { store } from "../../../../redux/store";
import App from '../../../App';
import GlobalStyles from '../../../../globalStyles';
import renderWithRouter from '../../../../testsUtils/renderWithRouter';
import postsListPayload from '../../../../testsUtils/mockPayload/postsList';
import { wait, fireEvent, waitForElement, waitForElementToBeRemoved } from '@testing-library/dom';
import { getPosts, deletePost, addPosts } from '../../../../api/endpoints/posts/posts';

jest.mock('../../../../api/endpoints/user/user', () => {
  return {
    getUser: jest.fn(() => Promise.resolve({
      isError: false,
      user: {
        id: '1',
        name: 'John',
        email: 'john@john.pl',
        userPicture: null,
      }
    })),
  };
});
const newPost = `
  New post added second ago
  #cats
`;
jest.mock('../../../../api/endpoints/posts/posts', () => {
  return {
    getPosts: jest.fn(() => Promise.resolve(postsListPayload)),
    deletePost: jest.fn(() => Promise.resolve({
      isError: false
    })),
    addPosts: jest.fn(() => Promise.resolve({
      postId: "3213",
      author: "John",
      content: newPost,
      createdAt: new Date(),
      comments: [],
      commentsAddedInCurrentSession: [],
      totalComments: 0,
      userPicture: null,
      likes: [],
      likesCount: 0
    }))
  };
});

const leftClick = { button: 0 };

it('Should test post list component', async () => {
  const { history, getAllByTestId, getByText, getByTestId } = renderWithRouter(
    <Provider store={store}>
      <GlobalStyles />
      <App />
    </Provider>, 
    {
      route: '/posts/cats'
    }
  );

  expect(getPosts).toHaveBeenCalledWith({
    limit: 10,
    offset: 0,
    sorting: {
      sort: ['-addedAt'],
      match: [{
        tags: 'cats'
      }]
    }
  });

  await wait(() => {
    expect(history.location.pathname).toEqual('/posts/cats');
  });

  expect(getAllByTestId('post').length).toBe(6);

  const [firstPost] = getAllByTestId('post');
  const deleteFirstPost = firstPost.querySelector('.SinglePostDeletePost');

  expect(firstPost.textContent).toContain('Delete post');

  if (deleteFirstPost) {
    fireEvent.click(deleteFirstPost, leftClick);
    const postLoadingSpinner = firstPost.querySelector('.SingleReplyLoader') as HTMLDivElement;

    await waitForElement(() => {
      return postLoadingSpinner;
    });

    await wait(() => {
      expect(deletePost).toHaveBeenCalledWith("1");
    });

    await waitForElementToBeRemoved(() => getByText("Hello im John"));
  }

  const postInput = getByTestId('post-input');
  const postButton = getByTestId('post-button');

  fireEvent.change(postInput, { target: { value: newPost } });
  fireEvent.click(postButton, leftClick);

  await wait(() => {
    expect(addPosts).toHaveBeenCalledWith({
      postContent: newPost,
      tags: ['#cats']
    }, 'cats');
  });
  const [firstPostAfterSend] = getAllByTestId('post');
  expect(firstPostAfterSend).toHaveTextContent('New post added second ago #cats');
});