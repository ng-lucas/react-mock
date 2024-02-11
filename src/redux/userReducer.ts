import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { user, UserState } from "../types";

const initialState: UserState = {
  value: {
    username: "",
    email: "",
    bio: "",
    image: "",
    token: "",
  },
  isLogin: true,
  correct: true,
};

if (localStorage.getItem("token")) {
  initialState.isLogin = true;
} else {
  initialState.isLogin = false;
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    checkPwd: (state: UserState, action: PayloadAction<boolean>) => {
      state.correct = action.payload;
      localStorage.setItem("correct", JSON.stringify(state.correct));
    },
    setUser: (state: UserState, action: PayloadAction<user>) => {
      if (localStorage.getItem("token")) {
        state.isLogin = true;
        state.value = action.payload;
      } else {
        state.value = action.payload;
      }
    },
    registerUser: (state: UserState, action: PayloadAction<user>) => {
      state.value = action.payload;
      state.isLogin = true;
      localStorage.setItem("user", JSON.stringify(state.value));
      localStorage.setItem("token", JSON.stringify(state.value.user.token));
    },
    loginUser: (state: UserState, action: PayloadAction<user>) => {
      state.value = action.payload;
      state.isLogin = true;
      localStorage.setItem("user", JSON.stringify(state.value));
      localStorage.setItem("token", JSON.stringify(state.value.user.token));
    },
    updateUser: (state: UserState, action: PayloadAction<user>) => {
      if (localStorage.getItem("token")) {
        state.isLogin = true;
        state.value = action.payload;
        localStorage.setItem("user", JSON.stringify(state.value));
      } else {
        state.value = action.payload;
        localStorage.setItem("user", JSON.stringify(state.value));
      }
    },
    logoutUser: (state: UserState) => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.isLogin = false;
      state.correct = initialState.correct;
      state.value = initialState.value;
    },
  },
});

export const {
  setUser,
  registerUser,
  loginUser,
  updateUser,
  checkPwd,
  logoutUser,
} = userSlice.actions;

export default userSlice.reducer;
