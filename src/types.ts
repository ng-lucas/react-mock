// Data Types
export type user = {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
};

export type feed = {
  articles: ArticleDataReturn[];
  articlesCount: number;
};

export type article = {
  title: string | null;
  description: string | null;
  body: string | null;
  tagList?: string | string[];
};

export type comment = {
  body: string;
};

export type author = {
  username: string;
  bio: string;
  image: string;
  following: boolean;
};

export type ArticleDataReturn = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: author;
};

export type CommentDataReturn = {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: author;
};

export type tags = {
  tags: string[];
};

// State for Reducers
export type UserState = {
  value: user;
  isLogin: boolean;
  correct: boolean;
};

export type FeedState = {
  search: feed | null;
  articles: feed | null;
  article: ArticleDataReturn;
};

export type TagState = {
  value: tags | null;
};

export type AuthorState = {
  value: author;
};

// Response in Saga

export type userResponse = {
  data: user;
  status: number;
};

export type tagsResponse = {
  data: tags;
};

export type feedResponse = {
  data: feed;
};

export type ArticleResponse = {
  data: {
    article: ArticleDataReturn;
  };
};

// Form Data
export type settingFormData = {
  bio: string;
  email: string;
  username: string;
  image: string;
  password: string;
  current: string;
  confirm: string;
};

export type loginFormData = {
  password: string;
  email: string;
};

export type signupFormData = {
  email: string;
  username: string;
  password: string;
};

// Component's Props
export type pgnProps = {
  total: number;
  perPage: number;
  current: number;
  offset: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
};
