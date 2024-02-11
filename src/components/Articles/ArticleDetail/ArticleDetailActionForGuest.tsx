import { FEED, AUTHOR } from "../../../saga/actionTypes";
import { ArticleDataReturn } from "../../../types";
import style from "./ArticleDetail.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Author from "../ArticleDetail/Author";

type Prop = {
  article: ArticleDataReturn;
  slug: string | undefined;
};

const ArticleDetailAction = ({ article, slug }: Prop) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFavoriteArticle = () => {
    const user = localStorage.getItem("user");
    if (user) {
      if (article.favorited === false) {
        dispatch({ type: FEED.LIKEARTICLE, payload: slug });
      } else {
        dispatch({
          type: FEED.UNLIKEARTICLE,
          payload: slug,
        });
      }
    } else {
      navigate("/login");
    }
  };

  const handleFollowArticle = () => {
    const user = localStorage.getItem("user");
    if (user) {
      if (article.author.following === false) {
        dispatch({
          type: AUTHOR.FOLLOWAUTHOR,
          payload: article.author.username,
        });
        dispatch({ type: ARTICLE.GETARTICLE, payload: { slug: slug } });
      } else {
        dispatch({
          type: AUTHOR.UNFOLLOWAUTHOR,
          payload: article.author.username,
        });
        dispatch({ type: ARTICLE.GETARTICLE, payload: { slug: slug } });
      }
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="d-flex mb-5">
      <Author article={article}></Author>
      <div className={`${style["btn-action"]}`}>
        <button
          className={`${style["btn"]} ${style["btn-follow"]}`}
          onClick={handleFollowArticle}
        >
          {!article.author.following ? (
            <>
              <i className="fas fa-plus mr-1"></i>
              Follow
            </>
          ) : (
            <>Followed</>
          )}
        </button>
        <button
          className={`${style["btn"]} ${style["btn-favorite"]}`}
          onClick={handleFavoriteArticle}
        >
          {article.favorited ? (
            <i className="fas fa-heart mr-1"></i>
          ) : (
            <i className="far fa-heart mr-1"></i>
          )}
          {`Favorite (${article.favoritesCount})`}
        </button>
      </div>
    </div>
  );
};

export default ArticleDetailAction;
