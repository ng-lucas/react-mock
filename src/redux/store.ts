import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import userReducer from "./userReducer";
import rootSagaWatcher from "../saga/rootSagaWatcher";
import feedReducer from "./feedReducer";
import tagsReducer from "./tagsReducer";
import authorReducer from "./authorReducer";
import commentsReducer from "./commentsReducer";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    tags: tagsReducer,
    author: authorReducer,
    comments: commentsReducer,
  },
  middleware: (defaultMiddleware) => [
    ...defaultMiddleware({ thunk: false }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSagaWatcher);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
