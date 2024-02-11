import styles from "../Articles/Articles.module.css";
import Toast from "../Other/Toast";
import FormArticle from "../Other/FormArticle";

export default function NewArticle() {
  const initialValuesForm = {
    title: "",
    description: "",
    body: "",
    tagList: "",
  };

  return (
    <div className={`container ${styles["article-wrapper"]}`}>
      <div className={`row align-items-center ${styles.row}`}>
        <div className="col-lg-6 offset-lg-3">
          <h2 className="mb-3 text-center">New Article</h2>
          <FormArticle
            initialValuesForm={initialValuesForm}
            newArt={true}
          ></FormArticle>
        </div>
      </div>
      <Toast />
    </div>
  );
}
