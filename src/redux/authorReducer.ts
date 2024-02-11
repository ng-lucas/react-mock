import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { author, AuthorState } from "../types";

const initialState: AuthorState = { 
  value: {
    username: "",
    bio: "",
    image: "",
    following: false,
  },
};

const AuthorSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    getAuthor: (state: AuthorState, action: PayloadAction<author>) => {
      state.value = action.payload;
    },
    followAuthor: (state: AuthorState, action: PayloadAction<author>) => {
      state.value = action.payload;
    },
    unFollowAuthor: (state: AuthorState, action: PayloadAction<author>) => {
      state.value = action.payload;
    },
  },
});

export const { getAuthor, followAuthor, unFollowAuthor } = AuthorSlice.actions;

export default AuthorSlice.reducer;
