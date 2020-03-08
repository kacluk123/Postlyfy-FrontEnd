import * as React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import { fetchUser } from '../../../redux/async/fetchUser';

import { BrowserRouter } from "react-router-dom";
import App from '../../App';
import GlobalStyles from '../../../globalStyles';
import { getUserError } from "../../../redux/actions/userActions";
  
jest.mock('../../../api/endpoints/tags/tags', () => {
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

  jest.mock('../../../api/endpoints/auth/signup/signup', () => {
    return {
      createUserUrl: jest.fn()
    };
  });

  jest.mock('../../../redux/async/fetchUser', () => {
    return {
      fetchUser: jest.fn()
    };
  });

  async function renderApp() {
    (fetchUser as jest.Mock).mockImplementation(() => {
      return getUserError({
        isError: true,
        messages: ['Error']
      });
    });
    const fakeNewAccoutValues = {
      nameInput: 'TestUser',
      passwordInput: 'testTest',
      emailInput: 'testEmail',
      avatarUrlInput: 'testAvatarUrl',
    };

    const {getByText, getByTestId } = render(
      <Provider store={store}>
        <GlobalStyles />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    await wait(() => {
      getByTestId('registerPage');
    });

    const registerNavButton = getByTestId('registerPage');
  
    fireEvent.click(registerNavButton, leftClick);

    const nameInput = getByTestId('registerFormName') as HTMLInputElement;
    const passwordInput = getByTestId('registerFormPassword') as HTMLInputElement;
    const emailInput = getByTestId('registerFormEmail') as HTMLInputElement;
    const avatarUrlInput = getByTestId('registerFormEmail') as HTMLInputElement;
    const submitRegisterButton = getByTestId('registerSubmitButton');

    fireEvent.change(nameInput, { target: { value: fakeNewAccoutValues.nameInput } });
    fireEvent.change(passwordInput, { target: { value: fakeNewAccoutValues.passwordInput } });
    fireEvent.change(emailInput, { target: { value: fakeNewAccoutValues.emailInput } });
    fireEvent.change(avatarUrlInput, { target: { value: fakeNewAccoutValues.avatarUrlInput } });

    return {
      fakeNewAccoutValues,
      getByTestId,
      getByText,
      nameInput,
      passwordInput,
      emailInput,
      avatarUrlInput,
      submitRegisterButton
    };
  }

  
  const leftClick = { button: 0 };
  
  it('Test correct register', async () => {
    const { 
      nameInput,
      passwordInput,
      emailInput,
      avatarUrlInput,
      fakeNewAccoutValues
    } = await renderApp();

    expect(nameInput.value).toBe(fakeNewAccoutValues.nameInput);
    expect(passwordInput.value).toBe(fakeNewAccoutValues.passwordInput);
    expect(emailInput.value).toBe(fakeNewAccoutValues.emailInput);
    expect(avatarUrlInput.value).toBe(fakeNewAccoutValues.avatarUrlInput);
  });