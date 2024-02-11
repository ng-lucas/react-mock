import { takeLatest, put } from "redux-saga/effects";
import { COMMENTS } from "./actionTypes";
import apiURL from "./apiService";
import { CommentDataReturn } from "../types";
import {
  getComments,
  addComment,
  deleteComment,
} from "../redux/commentsReducer";
import { AxiosError } from "axios";
import { handleError } from "../helper";

type response = {
  data: {
    comments: CommentDataReturn[];
  };
};

type responseAdd = {
  data: {
    comment: CommentDataReturn;
  };
};

export default function* commentsSaga() {
  yield takeLatest(COMMENTS.GETCOMMENTS, getCommentsSaga);
  yield takeLatest(COMMENTS.ADDCOMMENT, addCommentSaga);
  yield takeLatest(COMMENTS.DELETECOMMENT, deleteCommentSaga);
}

function* getCommentsSaga(action: { type: string; payload: { slug: string } }) {
  try {
    const result: response = yield apiURL.get(
      `/articles/${action.payload.slug}/comments`
    );
    yield put(getComments(result.data.comments));
  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data.errors);
    }
  }
}

function* addCommentSaga(action: {
  type: string;
  payload: {
    slug: string;
    data: {
      comment: { body: string };
    };
  };
}) {
  try {
    const result: responseAdd = yield apiURL.post(
      `articles/${action.payload.slug}/comments`,
      action.payload.data
    );
    yield put(addComment(result.data.comment));
  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data.errors);
    }
  }
}

function* deleteCommentSaga(action: {
  type: string;
  payload: { slug: string; id: number };
}) {
  try {
    yield apiURL.delete(
      `articles/${action.payload.slug}/comments/${action.payload.id}`
    );
    yield put(deleteComment(action.payload.id));
  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data.errors);
    }
  }
}
