export interface IServerResponseUser {
  isError: boolean;
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

export interface IUIResponseUser {
  isError: boolean;
  user: {
    id: string;
    name: string;
    email: string;
  };
}