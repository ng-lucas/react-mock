import { takeLatest, call, put } from "redux-saga/effects";
import apiURL from "./apiService";
import { ArticleResponse, article, feedResponse } from "../types";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  setSearch,
  setFeed,
  getArticle,
  setArticle,
  editArticle,
  likeArticle,
  unlikeArticle,
  deleteArticle,
  initialState,
} from "../redux/feedReducer";
import { FEED } from "./actionTypes";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { handleError } from "../helper";

// Feed Saga

function* setSearchSaga() {
  try {
    const response: feedResponse = yield call(
      apiURL.get,
      `/articles?offset=0&limit=197`
    );
    yield put(setSearch(response.data));
  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data.errors);
    }
  }
}

function* setGlobalFeedSaga(
  action: PayloadAction<{ limit: number; offset: number }>
) {
  try {
    yield put(setFeed(initialState.articles));
    const response: feedResponse = yield call(
      apiURL.get,
      `/articles?offset=${action.payload.offset}&limit=${action.payload.limit}`
    );
    yield put(setFeed(response.data));
  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data.errors);
    }
  }
}

function* setLocalFeedSaga(
  action: PayloadAction<{ limit: number; offset: number }>
) {
  try {
    yield put(setFeed(initialState.articles));
    const response: feedResponse = yield call(
      apiURL.get,
      `/articles/feed?offset=${action.payload.offset}&limit=${action.payload.limit}`
    );
    yield put(setFeed(response.data));
  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data.errors);
    }
  }
}

function* setTagsFeedSaga(
  action: PayloadAction<{ tag: string; limit: number; offset: number }>
) {
  try {
    yield put(setFeed(initialState.articles));
    const response: feedResponse = yield call(
      apiURL.get,
      `/articles?tag=${action.payload.tag}&offset=${action.payload.offset}&limit=${action.payload.limit}`
    );
    yield put(setFeed(response.data));
  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data.errors);
    }
  }
}

function* setAuthorFeedSaga(
  action: PayloadAction<{ username: string; limit: number; offset: number }>
) {
  try {
    yield put(setFeed(initialState.articles));
    const response: feedResponse = yield call(
      apiURL.get,
      `/articles?author=${action.payload.username}&offset=${action.payload.offset}&limit=${action.payload.limit}`
    );
    yield put(setFeed(response.data));
  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data.errors);
    }
  }
}

function* setLikeFeedSaga(
  action: PayloadAction<{ username: string; limit: number; offset: number }>
) {
  try {
    yield put(setFeed(initialState.articles));
    const response: feedResponse = yield call(
      apiURL.get,
      `/articles?favorited=${action.payload.username}&offset=${action.payload.offset}&limit=${action.payload.limit}`
    );
    yield put(setFeed(response.data));
  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data.errors);
    }
  }
}

// Article Saga

function* getArticleSaga(action: { type: string; payload: { slug: string } }) {
  try {
    const result: ArticleResponse = yield apiURL.get(
      `/articles/${action.payload.slug}`
    );
    yield put(getArticle(result.data.article));
  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data.errors);
    }
  }
}

function* setArticleSaga(action: {
  type: string;
  payload: { data: { article: article } };
}) {
  try {
    const result: ArticleResponse = yield apiURL.post(
      `/articles`,
      action.payload.data
    );
    yield put(setArticle(result.data.article));
    window.location.href = `/article-detail/${result.data.article.slug}`;
    toast.success("Post new article successfully");
  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data.errors);
    }
  }
}

function* editArticleSaga(action: {
  type: string;
  payload: {
    slug: string;
    data: {
      article: {
        title: string;
        description: string;
        body: string;
      };
    };
  };
}) {
  try {
    const result: ArticleResponse = yield apiURL.put(
      `articles/${action.payload.slug}`,
      action.payload.data
    );
    yield put(editArticle(result.data.article));
    window.location.href = `/article-detail/${result.data.article.slug}`;
    toast.success("Edit article successfully");
  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data.errors);
    }
  }
}

function* deleteArticleSaga(action: {
  type: string;
  payload: { slug: string };
}) {
  try {
    yield apiURL.delete(`articles/${action.payload.slug}`);
    yield put(deleteArticle());
    toast.success("Delete article successfully");
  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data.errors);
    }
  }
}

function* likeArticleSaga(action: { type: string; payload: string }) {
  try {
    yield apiURL.post(`articles/${action.payload}/favorite`);
    yield put(likeArticle());
    toast.success("Favorite article successfully");
  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data.errors);
    }
  }
}

function* unLikeArticleSaga(action: { type: string; payload: string }) {
  try {
    yield apiURL.delete(`articles/${action.payload}/favorite`);
    yield put(unlikeArticle());
    toast.success("Unfavorite article successfully");
  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data.errors);
    }
  }
}

// Watcher saga for user actions
export default function* feedSaga() {
  yield takeLatest(FEED.SEARCH, setSearchSaga);
  yield takeLatest(FEED.GLOBAL, setGlobalFeedSaga);
  yield takeLatest(FEED.LOCAL, setLocalFeedSaga);
  yield takeLatest(FEED.TAG, setTagsFeedSaga);
  yield takeLatest(FEED.AUTHOR, setAuthorFeedSaga);
  yield takeLatest(FEED.LIKED, setLikeFeedSaga);
  yield takeLatest(FEED.GETARTICLE, getArticleSaga);
  yield takeLatest(FEED.SETARTICLE, setArticleSaga);
  yield takeLatest(FEED.EDITARTICLE, editArticleSaga);
  yield takeLatest(FEED.DELETEARTICLE, deleteArticleSaga);
  yield takeLatest(FEED.LIKEARTICLE, likeArticleSaga);
  yield takeLatest(FEED.UNLIKEARTICLE, unLikeArticleSaga);
}
