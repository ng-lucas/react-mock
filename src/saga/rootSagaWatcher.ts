import { all, fork } from "redux-saga/effects";
import authorSaga from "./authorSaga";
import commentsSaga from "./commentsSaga";
import userSaga from "./userSaga";
import tagsSaga from "./tagsSaga";
import feedSaga from "./feedSaga";

export default function* rootSagaWatcher() {
  yield all([
    fork(userSaga),
    fork(tagsSaga),
    fork(feedSaga),
    fork(authorSaga),
    fork(commentsSaga),
  ]);
}
