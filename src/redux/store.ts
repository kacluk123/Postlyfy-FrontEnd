import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import { postsReducer } from "../redux/reducers/postReducer";

const middlewares = [thunk];

const rootReducer = combineReducers({
  postsReducer
});

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export type AppState = ReturnType<typeof rootReducer>;
