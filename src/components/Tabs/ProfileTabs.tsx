import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Post from "../Profile/Post";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FEED } from "../../saga/actionTypes";
import { SyncLoader } from "react-spinners";
import SelectPerPage from "../Other/PerPage";
import CmtPgn from "../Other/CmtPagination";

export default function ProfileTabs(props: { username: string }) {
  const { username } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get state in store for a Author's profile
  const feed = useSelector((state: RootState) => state.feed.articles);

  // Manage data for pagination and update UI when user interacts
  const [current, setCurrent] = useState<number>(1);
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  // Set Feed

  const showLiked = useCallback(() => {
    dispatch({
      type: FEED.LIKED,
      payload: { limit: limit, offset: offset, username: username },
    });
  }, [dispatch, limit, offset, username]);

  const showAu = useCallback(() => {
    dispatch({
      type: FEED.AUTHOR,
      payload: { limit: limit, offset: offset, username: username },
    });
  }, [dispatch, limit, offset, username]);

  useEffect(() => {
    dispatch({
      type: FEED.AUTHOR,
      payload: { limit: limit, offset: offset, username: username },
    });
  }, [dispatch, limit, offset, username, current]);

  // Handle Like an Article Function

  const handleLike = useCallback(
    (slug: string, liked: boolean) => {
      if (localStorage.getItem("token")) {
        if (liked) {
          dispatch({ type: FEED.UNLIKEARTICLE, payload: slug });
        } else {
          dispatch({ type: FEED.LIKEARTICLE, payload: slug });
        }
      } else {
        navigate("/login");
      }
    },
    [dispatch, navigate]
  );

  const renderJSX = useMemo(
    () => (
      <>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 px-0">
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    href="#byAu"
                    role="tab"
                    data-toggle="tab"
                    onClick={showAu}
                  >
                    {location.pathname === "/user"
                      ? "My Articles"
                      : `${username}'s Articles`}
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    onClick={showLiked}
                    className="nav-link"
                    href="#liked"
                    role="tab"
                    data-toggle="tab"
                  >
                    {location.pathname === "/user"
                      ? "My Favorited Articles"
                      : `${username}'s Favorited Articles`}
                  </a>
                </li>
                <SelectPerPage limit={limit} setLimit={setLimit} />
              </ul>
              <div className="tab-content">
                <div
                  className="tab-pane fade show active"
                  id="your"
                  role="tabpanel"
                >
                  <div className="container">
                    <div className="row mb-20px blog-post">
                      <div className="col-lg-12 px-0">
                        {feed ? (
                          <article>
                            {feed?.articlesCount === 0 ? (
                              <p className="m-auto my-2">
                                Has not posted any articles yet
                              </p>
                            ) : (
                              <>
                                {feed?.articles.map((article) => (
                                  <Post
                                    key={article.slug}
                                    article={article}
                                    handleLike={() =>
                                      handleLike(
                                        article.slug,
                                        article.favorited
                                      )
                                    }
                                  />
                                ))}

                                {feed.articlesCount < limit ? (
                                  <></>
                                ) : (
                                  <CmtPgn
                                    current={current}
                                    setCurrent={setCurrent}
                                    perPage={limit}
                                    total={feed.articlesCount}
                                    setOffset={setOffset}
                                    offset={offset}
                                  />
                                )}
                              </>
                            )}
                          </article>
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
                </div>
                <div className="tab-pane fade" id="liked" role="tabpanel">
                  <div className="container">
                    <div className="row mb-20px blog-post">
                      <div className="col-lg-12 px-0">
                        {feed ? (
                          <article>
                            {feed?.articlesCount === 0 ? (
                              <p className="m-auto my-2">
                                Has not liked any articles
                              </p>
                            ) : (
                              <>
                                {feed?.articles.map((article) => (
                                  <Post
                                    key={article.slug}
                                    article={article}
                                    handleLike={() =>
                                      handleLike(
                                        article.slug,
                                        article.favorited
                                      )
                                    }
                                  />
                                ))}

                                {feed.articlesCount < limit ? (
                                  <></>
                                ) : (
                                  <CmtPgn
                                    current={current}
                                    setCurrent={setCurrent}
                                    perPage={limit}
                                    total={feed.articlesCount}
                                    setOffset={setOffset}
                                    offset={offset}
                                  />
                                )}
                              </>
                            )}
                          </article>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
    [
      current,
      feed,
      handleLike,
      limit,
      location.pathname,
      offset,
      showAu,
      showLiked,
      username,
    ]
  );

  return renderJSX;
}
