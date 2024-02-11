import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { COMMENTS, FEED } from "../../../saga/actionTypes";
import Toast from "../../Other/Toast";
import ArticleDetailActionForGuest from "./ArticleDetailActionForGuest";
import ArticleDetailActionForAuthor from "./ArticleDetailActionForAuthor";
import Comments from "../../Comments";
import { SyncLoader } from "react-spinners";
import style from "./ArticleDetail.module.css";

export default function ArticleDetail() {
  const slug = useParams().slug;
  const article = useSelector((state: RootState) => state.feed.article);
  const comments = useSelector((state: RootState) => state.comments.comments);
  const dispatch = useDispatch();
  const userStr = localStorage.getItem("user");
  const handleDisplayAction = () => {
    let userObj;
    if (userStr) userObj = JSON.parse(userStr);
    return userObj?.user?.username !== article.author.username ? (
      <ArticleDetailActionForGuest
        article={article}
        slug={slug}
      ></ArticleDetailActionForGuest>
    ) : (
      <ArticleDetailActionForAuthor
        article={article}
        slug={slug}
      ></ArticleDetailActionForAuthor>
    );
  };

  useEffect(() => {
    dispatch({ type: FEED.GETARTICLE, payload: { slug: slug } });
    dispatch({ type: COMMENTS.GETCOMMENTS, payload: { slug: slug } });
  }, [dispatch, slug]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="blog-post single-post">
            {article.slug !== "" ? (
              <div className="entry-content-wrapper">
                <div className="mb-4">
                  <h1>{article.title}</h1>
                </div>
                {handleDisplayAction()}
                <div className="entry-content mb-lg-4">
                  <p>{article.body}</p>
                </div>
                <div className="entry-meta-bottom mt-10px mb-40px">
                  <div className="text-lg-left">
                    <ul className="entry-tags mb-25px">
                      {article.tagList.map((tag, index) => (
                        <li key={index} className={style["tag"]}>
                          {/* <a rel="tag">
                            {tag}
                          </a> */}
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="comments-area mb-5" id="comments">
                  {handleDisplayAction()}

                  <Comments comments={comments} slug={slug}></Comments>
                </div>
              </div>
            ) : (
              <SyncLoader
                className="d-flex my-4 justify-content-center"
                color="#343a40"
                size={10}
              />
            )}
          </div>
        </div>
      </div>
      <Toast></Toast>
    </div>
  );
}
