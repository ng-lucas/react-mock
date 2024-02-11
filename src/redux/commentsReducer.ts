import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommentDataReturn } from "../types";

type State = {
  comments: CommentDataReturn[];
};

const initialState: State = {
  comments: [],
};

const CommentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    getComments: (state: State, action: PayloadAction<CommentDataReturn[]>) => {
      state.comments = action.payload;
    },
    addComment: (state: State, action: PayloadAction<CommentDataReturn>) => {
      if (Array.isArray(state.comments)) {
        state.comments = [...state.comments, action.payload];
      }
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload
      );
    },
  },
});

export const { getComments, addComment, deleteComment } = CommentsSlice.actions;

export default CommentsSlice.reducer;
