import { useState } from "react";
import style from "./Comments.module.css";
import { user } from "../../types";
import CommentNotLogin from "./CommentNotLogin";
import { useDispatch } from "react-redux";
import { COMMENTS } from "../../saga/actionTypes";

type Props = {
  slug: string | undefined;
};

const CommentAction = ({ slug }: Props) => {
  const [comment, setComment] = useState<string>("");
  const dispatch = useDispatch();
  const userStr = localStorage.getItem("user");
  let userObj: { user: user };
  if (userStr) userObj = JSON.parse(userStr);

  const handleSubmitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: COMMENTS.ADDCOMMENT,
      payload: {
        slug: slug,
        data: {
          comment: { body: comment },
        },
      },
    });
    setComment("");
  };

  const commentActionShow = () => {
    return !userObj?.user?.username ? (
      <CommentNotLogin></CommentNotLogin>
    ) : (
      <div className="comment-respond mb-50px" id="respond">
        <h3 className="comment-reply-title" id="reply-title">
          Leave a comment{" "}
        </h3>
        <form
          className="comment-form"
          id="commentform"
          onSubmit={handleSubmitComment}
        >
          <p className="comment-form-comment">
            <textarea
              id="comment"
              name="comment"
              cols={10}
              rows={8}
              required={true}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setComment(e.target.value)
              }
              value={comment}
            ></textarea>
          </p>

          <p className="form-submit mt-3">
            <input
              className="submit"
              id="submit"
              name="submit"
              type="submit"
              value="Post Comment"
            />
          </p>
        </form>
      </div>
    );
  };

  return (
    <div className={`${style["comment-action"]}`}>{commentActionShow()}</div>
  );
};

export default CommentAction;
