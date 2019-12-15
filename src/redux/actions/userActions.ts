import { UIServerMessages } from "../../api/endpoints/common/errorDataUnpacker";
import { IUIResponseUser } from '../../api/endpoints/user/userTypes'
 
export enum USER_ACTIONS_NAMES {
  GET_USER_DATA = "GET_USER_DATA",
  GET_USER_PENDING = "GET_USER_PENDING",
  USER_ERROR = "USER_ERROR"
}

export interface IUserBaseAction {
  type: USER_ACTIONS_NAMES;
}

export interface IUserError extends IUserBaseAction {
  error: UIServerMessages;
  type: USER_ACTIONS_NAMES.USER_ERROR;
}

export interface IUserPending extends IUserBaseAction {
  type: USER_ACTIONS_NAMES.GET_USER_PENDING;
}

export interface IGetUserData extends IUserBaseAction {
  type: USER_ACTIONS_NAMES.GET_USER_DATA;
  user: IUIResponseUser;
}

export type UserActions =
  | IUserError
  | IUserPending
  | IGetUserData;

export function getUser(payload: IUIResponseUser) {
  return {
    type: USER_ACTIONS_NAMES.GET_USER_DATA,
    payload
  };
}

export function getUserPending(): IUserPending {
  return {
    type: USER_ACTIONS_NAMES.GET_USER_PENDING
  };
}

export function getUserError(
  error: UIServerMessages
): IUserError {
  return {
    type: USER_ACTIONS_NAMES.USER_ERROR,
    error
  };
}
