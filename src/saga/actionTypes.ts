export const AUTHOR = {
  GETAUTHOR: "AUTHOR_GETAUTHOR",
  FOLLOWAUTHOR: "AUTHOR_FOLLOWAUTHOR",
  UNFOLLOWAUTHOR: "AUTHOR_UNFOLLOWAUTHOR",
};

export const COMMENTS = {
  GETCOMMENTS: "COMMENTS_GETCOMMENTS",
  ADDCOMMENT: "COMMENTS_ADDCOMMENT",
  DELETECOMMENT: "COMMENTS_DELETECOMMENT",
};
export const USER = {
  CHECK: "USER_CHECK",
  REGISTER: "USER_REGISTER",
  LOGIN: "USER_LOGIN",
  UPDATE: "USER_UPDATE", // To update user's information
  FETCH: "USER_FETCH", // To GET user data
};

export const FEED = {
  SEARCH: "FEED_SEARCH",
  GLOBAL: "FEED_GLOBAL", // Global feed
  LIKED: "FEED_LIKED", // All the articles someone liked (could use for both user and author)
  TAG: "FEED_TAG", // All the articles have a specific tag
  AUTHOR: "FEED_AUTHOR", // All the articles of a specific author
  LOCAL: "FEED_LOCAL", // the articles of the authors you followed
  GETARTICLE: "ARTICLES_GETARTICLE",
  SETARTICLE: "ARTICLES_SETARTICLE",
  EDITARTICLE: "ARTICLES_EDITARTICLE",
  DELETEARTICLE: "ARTICLES_DELETEARTICLE",
  LIKEARTICLE: "ARTICLES_LIKEARTICLE",
  UNLIKEARTICLE: "ARTICLES_UNLIKEARTICLE",
  COMMENTARTICLE: "ARTICLES_COMMENTARTICLE",
};

export const TAGS = {
  FETCHTAG: "TAGS_FETCH",
};
