import { useNavigate } from "react-router-dom";
import style from './Author.module.css'
import { ArticleDataReturn } from "../../../../types";
import { formattedDate } from "../../../../helper";

type Prop = {
  article: ArticleDataReturn;
};

const Author = ({article}: Prop) => {
  const navigate = useNavigate();

  const handleClickAuthor = () => {
    navigate(`/profile/${article.author.username}`);
  };
  
  return (
    <div className="d-flex mr-5">
      <div className={`${style["avt-author"]}`}>
        <a onClick={handleClickAuthor}>
          <img
            src={article.author.image}
            alt="Avatar"
            className={`${style["avt"]}`}
          />
        </a>
      </div>
      <div className={`${style["author"]} ml-2`}>
        <div className={`${style["name"]}`}>
          <a onClick={handleClickAuthor}>{article.author.username}</a>
        </div>
        <div className={`${style["timer"]}`}>
          {formattedDate(article.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default Author;
