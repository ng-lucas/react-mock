import { takeLatest, call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { loginFormData, user, userResponse } from "../types";
import apiURL from "./apiService";
import {
  setUser,
  loginUser,
  registerUser,
  updateUser,
  checkPwd,
} from "../redux/userReducer";
import { USER } from "./actionTypes";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { handleError } from "../helper";

// Check if current password is true
function* checkPwdSaga(action: PayloadAction<loginFormData>) {
  try {
    const response: userResponse = yield call(apiURL.post, "/users/login", {
      user: action.payload,
    });
    if (response.status === 200) {
      yield put(checkPwd(true));
    }
  } catch (error) {
    yield put(checkPwd(false));
  }
}

// Handle get user's information
function* setUserSaga() {
  try {
    const response: userResponse = yield call(apiURL.get, "/user");
    yield put(setUser(response.data.user));
  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data.errors);
    }
  }
}

// Handling user register
function* registerUserSaga(
  action: PayloadAction<{ username: string; email: string; password: string }>
) {
  try {
    const response: userResponse = yield call(apiURL.post, "/users", {
      user: action.payload,
    });
    yield put(registerUser(response.data));
    window.history.back();
    toast.success("Your account has been successfully created!");
  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data.errors);
    }
  }
}

// Handling user login
function* loginUserSaga(action: PayloadAction<loginFormData>) {
  try {
    const response: userResponse = yield call(apiURL.post, "/users/login", {
      user: action.payload,
    });
    yield put(loginUser(response.data));
    window.history.back();
    toast.success("Login success!");
  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data.errors);
    }
  }
}

// Handling user update
function* updateUserSaga(action: PayloadAction<user>) {
  try {
    const response: userResponse = yield call(apiURL.put, "/user", {
      user: action.payload,
    });
    console.log("update info:", action.payload);
    yield put(updateUser(response.data));
    window.location.replace("/user");
    toast.success("Your information has been successfully updated!");
  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data.errors);
    }
  }
}

// Watcher saga for user actions
export default function* userSaga() {
  yield takeLatest(USER.FETCH, setUserSaga);
  yield takeLatest(USER.REGISTER, registerUserSaga);
  yield takeLatest(USER.LOGIN, loginUserSaga);
  yield takeLatest(USER.UPDATE, updateUserSaga);
  yield takeLatest(USER.CHECK, checkPwdSaga);
}
