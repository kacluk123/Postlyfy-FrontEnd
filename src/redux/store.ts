import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { productsReducer } from "../redux/reducers/postReducer";

const middlewares = [thunk];

export const store = createStore(
  productsReducer,
  applyMiddleware(...middlewares)
);
