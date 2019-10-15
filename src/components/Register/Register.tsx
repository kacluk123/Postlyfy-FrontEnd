import * as React from "react";
import * as Styled from "./RegisterStyles";
import StandardInput from "../Common/StandardInput/StandardInput";
import Button from "../Common/Button";
import ServerMessageViewComponent from "../Common/ServerMessageView";
import useForm from "../../hooks/useForm";
import * as API from "../../api/endpoints/auth/signup/signup";
import { UIServerMessages } from "../../api/endpoints/common/errorDataUnpacker";

const RegisterComponent = () => {
  const {
    formValues,
    handleChangeFormValues,
    errorValues,
    onButtonClick,
    isButtonDisabled
  } = useForm({
    initialValues: {
      formEmail: "",
      formPassword: "",
      formName: ""
    },
    validationRules: {
      formEmail: {
        required: true,
        email: true
      },
      formPassword: {
        required: true,
        minLength: 6
      },
      formName: {
        required: true,
        minLength: 6
      }
    }
  });

  const [apiResponseMessage, setApiResponseMessage] = React.useState<
    UIServerMessages
  >({
    isError: false,
    messages: []
  });

  const [buttonPending, setButtonPending] = React.useState<boolean>(false);

  const createUserOnButtonClick = async () => {
    setButtonPending(true);

    const response = await API.createUser(formValues);

    setApiResponseMessage(response);
    setButtonPending(false);
  };

  return (
    <Styled.RegisterContainer>
      <Styled.Register>
        <StandardInput
          value={formValues.formName}
          errorMessage={errorValues.formName}
          name="formName"
          onChange={handleChangeFormValues}
          label="Name"
        />
        <StandardInput
          value={formValues.formEmail}
          errorMessage={errorValues.formEmail}
          name="formEmail"
          onChange={handleChangeFormValues}
          label="Email"
        />
        <StandardInput
          value={formValues.formPassword}
          errorMessage={errorValues.formPassword}
          name="formPassword"
          type="password"
          onChange={handleChangeFormValues}
          label="Password"
        />
        <Button
          disabled={isButtonDisabled}
          onClick={onButtonClick(createUserOnButtonClick)}
          isPending={buttonPending}
        >
          Register
        </Button>
        <Styled.RegisterServerMessages>
          <ServerMessageViewComponent
            isError={apiResponseMessage.isError}
            messages={apiResponseMessage.messages}
          />
        </Styled.RegisterServerMessages>
      </Styled.Register>
    </Styled.RegisterContainer>
  );
};

export default RegisterComponent;
