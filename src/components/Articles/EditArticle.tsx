import styles from "../Articles/Articles.module.css";
import Toast from "../Other/Toast";
import FormArticle from "../Other/FormArticle";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { FEED } from "../../saga/actionTypes";

export default function EditArticle() {
  const slug = useParams().slug;
  const article = useSelector((state: RootState) => state.feed.article);
  const dispatch = useDispatch();

  useEffect(() => {
    if (article.slug === "")
      dispatch({ type: FEED.GETARTICLE, payload: { slug: slug } });
  }, []);

  return (
    <div className={`container ${styles["article-wrapper"]}`}>
      <div className={`row align-items-center ${styles.row}`}>
        <div className="col-lg-6 offset-lg-3">
          <h2 className="mb-3 text-center">Edit Article</h2>
          <FormArticle
            initialValuesForm={{
              title: article.title,
              description: article.description,
              body: article.body,
              tagList: article.tagList.join(" "),
            }}
            newArt={false}
            slug={slug}
          ></FormArticle>
        </div>
      </div>
      <Toast />
    </div>
  );
}
