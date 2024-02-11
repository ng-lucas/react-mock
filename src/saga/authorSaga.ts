import { takeLatest, put, call } from "redux-saga/effects";
import { AUTHOR } from "./actionTypes";
import {
  getAuthor,
  followAuthor,
  unFollowAuthor,
} from "../redux/authorReducer";
import apiURL from "./apiService";
import { author } from "../types";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { handleError } from "../helper";

type response = {
  data: {
    profile: author;
  };
};

export default function* authorSaga() {
  yield takeLatest(AUTHOR.GETAUTHOR, getAuthorSaga);
  yield takeLatest(AUTHOR.FOLLOWAUTHOR, followAuthorSaga);
  yield takeLatest(AUTHOR.UNFOLLOWAUTHOR, unFollowAuthorSaga);
}

function* getAuthorSaga(action: {
  type: string;
  payload: { username: string };
}) {
  try {
    const result: response = yield call(
      apiURL.get,
      `/profiles/${action.payload}`
    );
    yield put(getAuthor(result.data.profile));
  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data.errors);
    }
  }
}

function* followAuthorSaga(action: {
  type: string;
  payload: { username: string };
}) {
  try {
    const result: response = yield call(
      apiURL.post,
      `profiles/${action.payload}/follow`
    );
    yield put(followAuthor(result.data.profile));
    toast.success("Followed successfully");
  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data.errors);
    }
  }
}

function* unFollowAuthorSaga(action: {
  type: string;
  payload: { username: string };
}) {
  try {
    const result: response = yield call(
      apiURL.delete,
      `profiles/${action.payload}/follow`
    );
    yield put(unFollowAuthor(result.data.profile));
    toast.success("Unfollowed successfully");
  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data.errors);
    }
  }
}
