import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { ArticleDataReturn, feed, FeedState } from "../types";

export const initialState: FeedState = {
  search: null,
  articles: null,
  article: {
    slug: "",
    title: "",
    description: "",
    body: "",
    tagList: [],
    createdAt: "",
    updatedAt: "",
    favorited: false,
    favoritesCount: 0,
    author: {
      username: "",
      bio: "",
      image: "",
      following: false,
    },
  },
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setSearch: (state: FeedState, action: PayloadAction<feed>) => {
      state.search = action.payload;
    },
    setFeed: (state: FeedState, action: PayloadAction<feed | null>) => {
      state.articles = action.payload;
    },
    getArticle: (
      state: FeedState,
      action: PayloadAction<ArticleDataReturn>
    ) => {
      state.article = action.payload;
    },
    setArticle: (
      state: FeedState,
      action: PayloadAction<ArticleDataReturn>
    ) => {
      state.article = action.payload;
    },
    editArticle: (
      state: FeedState,
      action: PayloadAction<ArticleDataReturn>
    ) => {
      state.article = action.payload;
    },
    likeArticle: (state: FeedState) => {
      if (state.article.favorited === false) {
        state.article.favorited = true;
        state.article.favoritesCount += 1;
      }
    },
    unlikeArticle: (state: FeedState) => {
      if (state.article.favorited === true) {
        state.article.favorited = false;
        state.article.favoritesCount -= 1;
      }
    },
    deleteArticle: (state: FeedState) => {
      state.article = initialState.article;
    },
  },
});

export const {
  setSearch,
  setFeed,
  getArticle,
  setArticle,
  editArticle,
  likeArticle,
  unlikeArticle,
  deleteArticle,
} = feedSlice.actions;

export default feedSlice.reducer;
