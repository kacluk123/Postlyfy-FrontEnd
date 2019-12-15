import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import { postsReducer } from "../redux/reducers/postReducer";
import { userReducer } from "../redux/reducers/userReducer";

const middlewares = [thunk];

const rootReducer = combineReducers({
  userReducer,
  postsReducer,
});

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export interface IRootReducer {
  userReducer: ReturnType<typeof userReducer>;
  postsReducer: ReturnType<typeof postsReducer>;
}

export type AppState = IRootReducer;
