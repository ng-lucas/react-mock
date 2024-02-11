import { takeLatest, call, put } from "redux-saga/effects";
import apiURL from "./apiService";
import { setTags } from "../redux/tagsReducer";
import { tagsResponse } from "../types";
import { TAGS } from "./actionTypes";
import { AxiosError } from "axios";
import { handleError } from "../helper";

// Handle get user's information
function* setTagsSaga() {
  try {
    const response: tagsResponse = yield call(apiURL.get, "/tags");
    yield put(setTags(response.data));
  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data.errors);
    }
  }
}

// Watcher saga for user actions
export default function* tagsSaga() {
  yield takeLatest(TAGS.FETCHTAG, setTagsSaga);
}
