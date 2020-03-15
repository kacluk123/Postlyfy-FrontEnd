import * as React from 'react';
import { wait, fireEvent } from '@testing-library/react';
import { Provider } from "react-redux";
import { store } from "../../../../redux/store";
import App from '../../../App';
import GlobalStyles from '../../../../globalStyles';
import renderWithRouter from '../../../../testsUtils/renderWithRouter';
import postsListPayload from '../../../../testsUtils/mockPayload/postsList';

jest.mock('../../../../api/endpoints/tags/tags', () => {
  return {
    getTags: jest.fn(() => Promise.resolve({
      tags: [{
        tagName: 'hello',
        count: 2
      }],
      isError: false
    }))
  };
}); 

jest.mock('../../../../api/endpoints/posts/posts', () => {
  return {
    getPosts: jest.fn(() => Promise.resolve(postsListPayload))
  };
});

jest.mock('../../../../api/endpoints/user/user', () => {
  return {
    getUser: jest.fn(() => Promise.resolve({
      isError: false,
      user: {
        _id: 'asd',
        name: 'asddasd',
        email: 'asd@asd.pl',
        userPicture: null,
      }
    })),
  };
});

const leftClick = { button: 0 };
it('Should test taglist component', async () => {
  const { history, getByTestId } = renderWithRouter(
    <Provider store={store}>
      <GlobalStyles />
      <App />
    </Provider>, 
    {
      route: '/'
    }
  );
  await wait(() => {
    expect(history.location.pathname).toEqual('/taglist');
  });

  const searchInput = getByTestId('searchTagInput') as HTMLInputElement;
  const submitButton = getByTestId('submitButton') as HTMLButtonElement;

  fireEvent.change(searchInput, { target: { value: 'cats' } });
  
  expect(searchInput.value).toBe('cats');
  fireEvent.click(submitButton, leftClick);

  wait(() => {
    expect(history.location.pathname).toEqual('/posts/cats');
  });
});