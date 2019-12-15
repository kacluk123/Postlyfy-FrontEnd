import { UIServerMessages } from "../../api/endpoints/common/errorDataUnpacker";
import { IUIResponseUser } from "../../api/endpoints/user/userTypes";
import { UserActions, USER_ACTIONS_NAMES } from '../actions/userActions';

interface InitialStateType {
  readonly pending: boolean;
  readonly userData: IUIResponseUser | null;
  readonly errors: UIServerMessages["messages"];
}

const initialState = {
  pending: false,
  userData: null,
  errors: [],
}

export function userReducer(
  state: InitialStateType = initialState,
  action: UserActions
) {
  switch (action.type) {
    case USER_ACTIONS_NAMES.GET_USER_PENDING: {
      return {
        ...state,
        pending: true
      };
    }

    case USER_ACTIONS_NAMES.GET_USER_DATA: {
      return {
        ...state,
        pending: false,
        userData: action.user
      };
    }
    case USER_ACTIONS_NAMES.USER_ERROR: {
      return {
        ...state,
        errors: action.error,
        pending: false,
      };
    }
    default: {
      return state;
    }
  }
}