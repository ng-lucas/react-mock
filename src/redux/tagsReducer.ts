import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tags, TagState } from "../types";

const initialState: TagState = {
  value: null,
};

const tagSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    setTags: (state: TagState, action: PayloadAction<tags>) => {
      state.value = action.payload;
    },
  },
});

export const { setTags, selectTag } = tagSlice.actions;

export default tagSlice.reducer;