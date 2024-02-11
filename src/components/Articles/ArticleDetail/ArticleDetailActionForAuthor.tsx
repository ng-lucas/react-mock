import { FEED } from "../../../saga/actionTypes";
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

  const handleDeleteArticle = () => {
    dispatch({
      type: FEED.DELETEARTICLE,
      payload: { slug: slug },
    });

    navigate("/");
  };

  const handleEditArticle = () => {
    navigate(`/edit-myArticle/${article.slug}`);
  };
  return (
    <div className="d-flex mb-5">
      <Author article={article}></Author>
      <div className={`${style["btn-action"]}`}>
        <button
          className={`${style["btn"]} ${style["btn-follow"]}`}
          onClick={handleEditArticle}
        >
          Edit Article
        </button>
        <button
          className={`${style["btn"]} ${style["btn-favorite"]}`}
          onClick={handleDeleteArticle}
        >
          <i className="mr-1 fas fa-trash-alt"></i>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ArticleDetailAction;
