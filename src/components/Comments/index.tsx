import { CommentDataReturn, user } from "../../types";
import style from "./Comments.module.css";
import CommentAction from "./CommentAction";
import { formattedDate } from "../../helper";
import { useDispatch } from "react-redux";
import { COMMENTS } from "../../saga/actionTypes";
import { useState } from "react";
import CmtPgn from "../Other/Pagination";
import { useNavigate } from "react-router-dom";

type Props = {
  comments: CommentDataReturn[];
  slug: string | undefined;
};

const Comments = ({ comments, slug }: Props) => {
  const userStr = localStorage.getItem("user");
  let userObj: { user: user };
  if (userStr) userObj = JSON.parse(userStr);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [current, setCurrent] = useState<number>(1);
  const [offset, setOffset] = useState<number>(0);
  const limit = 10;

  const handleDeleteComment = (id: number) => {
    dispatch({ type: COMMENTS.DELETECOMMENT, payload: { slug: slug, id: id } });
  };

  return (
    <>
      <h2 className="comments-title h4">Comments</h2>
      <CommentAction slug={slug}></CommentAction>
      <ol className="comment-list mb-5">
        {[...comments]
          .reverse()
          .slice(0 + (current - 1) * 10, limit + (current - 1) * 10)
          .map((comment) => {
            return (
              <li
                className="comment even thread-even depth-1 mb-4"
                id="comment-1"
                key={comment.id}
              >
                <div className="comment-body" id="div-comment-1">
                  <footer className="comment-meta">
                    <div className="d-flex justify-content-between">
                      <div>
                        <div className="comment-author vcard d-flex">
                          <img
                            className={`avatar ${style["user-cmt"]}`}
                            alt="profile pic"
                            src={comment.author.image}
                            height="100"
                            width="100"
                            onClick={() =>
                              navigate(`/profile/${comment.author.username}`)
                            }
                          />
                          <div>
                            <div className={`${style["name-comment"]}`}>
                              <span
                                className={style["user-cmt"]}
                                onClick={() =>
                                  navigate(
                                    `/profile/${comment.author.username}`
                                  )
                                }
                              >
                                {comment.author.username}
                              </span>
                            </div>
                            <div className={`${style["timer-comment"]}`}>
                              {formattedDate(comment.createdAt)}
                            </div>
                          </div>
                          <span className="says">says:</span>
                        </div>
                      </div>

                      {userObj?.user?.username === comment.author.username ? (
                        <div
                          className={`${style["delete-comment"]} d-flex align-items-start justify-content-center`}
                        >
                          <button
                            type="button"
                            className={`${style["btn-delete"]}`}
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div className="comment-content">
                      <p>{comment.body}</p>
                    </div>
                  </footer>
                </div>
              </li>
            );
          })}
      </ol>
      {comments.length > 10 ? (
        <CmtPgn
          current={current}
          setCurrent={setCurrent}
          perPage={limit}
          total={comments.length}
          setOffset={setOffset}
          offset={offset}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Comments;
