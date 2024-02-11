import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { FEED } from "../../saga/actionTypes";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { formattedDate } from "../../helper";

export default function TopPost() {
  const feed = useSelector((state: RootState) => state.feed.search);
  // const totalFeedLength = feed?.articlesCount;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: FEED.GLOBAL,
      payload: { limit: 198, offset: 0 },
    });
  }, []);

  const topArticles = Array.isArray(feed?.articles)
    ? [...feed.articles]
        .sort((a, b) => b.favoritesCount - a.favoritesCount)
        .slice(0, 5)
    : null;

  return (
    <div className="widget bg-color-grayflame pt-30px pb-30px px-30px">
      <h5 className="widget-title mb-25px">Top Posts</h5>
      <ul className="simple-entry-list blog-post">
        {topArticles ? (
          <>
            {topArticles?.map((article, index) => (
              <li key={index}>
                <div className="reveal-title">{index + 1}</div>
                <div className="entry-content-wrapper">
                  <Link className="entry-title" to={`article-detail/${article.slug}`}>{article.title}</Link>
                  <span className="entry-meta-top">{formattedDate(article.createdAt)}</span>
                  <div className="entry-meta-top text-truncate">
                    {article.tagList.map((tag, index) => {
                      return (
                        <span
                          className="post_meta_category text-truncate"
                          key={index}
                        >
                          <Link to="">{tag}</Link>
                        </span>
                      );
                    })}
                  </div>
                </div>
              </li>
            ))}
          </>
        ) : (
          <SyncLoader
            className="d-flex my-4 justify-content-center"
            color="#343a40"
            size={10}
          />
        )}
        {/* } */}
      </ul>
    </div>
  );
}
