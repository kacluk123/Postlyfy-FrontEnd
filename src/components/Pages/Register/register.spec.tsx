import * as React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import { fetchUser } from '../../../redux/async/fetchUser';
import { BrowserRouter } from "react-router-dom";
import App from '../../App';
import GlobalStyles from '../../../globalStyles';
import { getUserError } from "../../../redux/actions/userActions";
import { createUser } from "../../../api/endpoints/auth/signup/signup";

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

jest.mock('../../../redux/async/fetchUser', () => {
  return {
    fetchUser: jest.fn()
  };
});

  jest.mock('../../../api/endpoints/auth/signup/signup', () => {
    return {
      createUser: jest.fn()
    };
  });


  const fakeNewAccoutValues = {
    formName: 'TestUser',
    formPassword: 'testTest',
    formEmail: 'testEmail@gmail.com',
    formUserPicture: 'testAvatarUrl',
  };

  async function renderApp() {
    (fetchUser as jest.Mock).mockImplementation(() => {
      return getUserError({
        isError: true,
        messages: ['Error']
      });
    });

    const { getByText, getByTestId } = render(
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
    const avatarUrlInput = getByTestId('registerFormAvatarUrl') as HTMLInputElement;
    const submitRegisterButton = getByTestId('registerSubmitButton');

    fireEvent.change(nameInput, { target: { value: fakeNewAccoutValues.formName } });
    fireEvent.change(passwordInput, { target: { value: fakeNewAccoutValues.formPassword } });
    fireEvent.change(emailInput, { target: { value: fakeNewAccoutValues.formEmail } });
    fireEvent.change(avatarUrlInput, { target: { value: fakeNewAccoutValues.formUserPicture } });

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
  afterEach(jest.clearAllMocks);
  
  it('Test correct register', async () => {
    const { 
      nameInput,
      passwordInput,
      emailInput,
      avatarUrlInput,
      fakeNewAccoutValues,
      getByText,
      submitRegisterButton
    } = await renderApp();

    expect(nameInput.value).toBe(fakeNewAccoutValues.formName);
    expect(passwordInput.value).toBe(fakeNewAccoutValues.formPassword);
    expect(emailInput.value).toBe(fakeNewAccoutValues.formEmail);
    expect(avatarUrlInput.value).toBe(fakeNewAccoutValues.formUserPicture);

    (createUser as jest.Mock).mockImplementation(() => (Promise.resolve({
      messages: ["Correctly logged"],
      isError: false
    })));
    
    fireEvent.click(submitRegisterButton, leftClick);
    
    expect(createUser).toHaveBeenCalledTimes(1);
    expect(createUser).toHaveBeenCalledWith(fakeNewAccoutValues);

    await wait(() => {
      expect(getByText("Correctly logged")).toBeTruthy();
    });
  }); 

  it('Test failed register', async () => {
    const { 
      fakeNewAccoutValues,
      getByText,
      submitRegisterButton
    } = await renderApp();

    (createUser as jest.Mock).mockImplementation(() => (Promise.resolve({
      messages: ["User already exist"],
      isError: true
    })));
    
    fireEvent.click(submitRegisterButton, leftClick);
    
    expect(createUser).toHaveBeenCalledTimes(1);
    expect(createUser).toHaveBeenCalledWith(fakeNewAccoutValues);

    await wait(() => {
      expect(getByText("User already exist")).toBeTruthy();
    });
  }); 