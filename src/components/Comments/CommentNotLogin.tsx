import { useNavigate } from "react-router-dom";
import style from "./Comments.module.css";
const CommentNotLogin = () => {
  const navigate = useNavigate();
  return (
    <div>
      <p className={`${style["action-p"]}`}>
        <span
          onClick={() => navigate("/login")}
          className={`${style["action-sign"]}`}
        >
          Sign in
        </span>{" "}
        or{" "}
        <span
          onClick={() => navigate("/signup")}
          className={`${style["action-sign"]}`}
        >
          Sign up
        </span>{" "}
        to add comments on this article.
      </p>
    </div>
  );
};

export default CommentNotLogin;
