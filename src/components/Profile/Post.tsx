import { Link } from "react-router-dom";
import { ArticleDataReturn } from "../../types";
import { useMemo } from "react";
import { formattedDate } from "../../helper";

export default function Post(props: {
  article: ArticleDataReturn;
  handleLike: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const { article, handleLike } = props;

  const renderJSX = useMemo(
    () => (
      <>
        <div className="entry-content-wrapper my-4">
          <button
            onClick={handleLike}
            className="btn btn-outline-danger py-1 px-2 rounded btn-like box-shadow-none"
          >
            <i
              className={
                article.favorited ? "bx bxs-heart pr-1" : "bx bx-heart pr-1"
              }
            ></i>
            <span>{article.favoritesCount}</span>
          </button>
          <div className="entry-meta-top">
            <span className="entry-meta-category">
              <a>
                {(article.tagList[0], article.tagList[1], article.tagList[2])}
              </a>
            </span>
            <span className="post-meta-date">
              {formattedDate(article.createdAt)}
            </span>
          </div>
          <h5 className="entry-title text-truncate">
            <Link to={`/article-detail/${article.slug}`}>{article.title}</Link>
          </h5>
          <div className="entry-content">
            <p>{article.description}</p>
          </div>
          <Link
            className="entry-read-more"
            to={`/article-detail/${article.slug}`}
          >
            Read More<i className="fas fa-long-arrow-alt-right ml-1"></i>
          </Link>
        </div>
      </>
    ),
    [handleLike, article]
  );

  return renderJSX;
}
