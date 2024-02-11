import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FEED } from "../../saga/actionTypes";
import Pgn from "../Other/Pagination";
import { SyncLoader } from "react-spinners";
import { formattedDate } from "../../helper";
import SelectPerPage from "../Other/PerPage";

export default function Tabs(props: {
  selectedTag: string;
  setSelectedTag: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { selectedTag, setSelectedTag } = props;
  const { type, tag } = useParams();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [current, setCurrent] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>("global-feed");
  const [selectedItem, setSelectedItem] = useState<string>(
    selectedTag || tag || ""
  );

  const feed = useSelector((state: RootState) => state.feed.articles);

  // global feed
  const fetchGlobalFeed = useCallback(() => {
    dispatch({ type: FEED.GLOBAL, payload: { offset: offset, limit: limit } });
  }, [dispatch, offset, limit]);

  // local feed
  const fetchMyFeed = useCallback(() => {
    if (token) {
      dispatch({ type: FEED.LOCAL, payload: { offset: offset, limit: limit } });
    }
  }, [dispatch, token, offset, limit]);

  // feed by tag
  const fetchTagFeed = useCallback(() => {
    if (selectedItem) {
      dispatch({
        type: FEED.TAG,
        payload: { tag: selectedItem, offset: offset, limit: limit },
      });
    }
  }, [selectedItem, dispatch, offset, limit]);

  // clear tags
  useEffect(() => {
    setSelectedItem(selectedTag);
  }, [navigate, selectedTag]);

  useEffect(() => {
    switch (type) {
      case "global-feed":
        fetchGlobalFeed();
        break;
      case "my-feed":
        fetchMyFeed();
        break;
      case "tag":
        fetchTagFeed();
        break;
    }
  }, [type, fetchGlobalFeed, fetchMyFeed, fetchTagFeed]);

  const handleFavorite = (slug: string, favorited: boolean) => {
    const token = localStorage.getItem("token");
    if (token) {
      if (favorited) {
        dispatch({ type: FEED.UNLIKEARTICLE, payload: slug });
      } else {
        dispatch({ type: FEED.LIKEARTICLE, payload: slug });
      }
    } else {
      navigate("/login");
    }
  };

  const handleNavigateProfile = (
    e: React.MouseEvent<HTMLAnchorElement>,
    username: string
  ) => {
    e.preventDefault();
    navigate(`/profile/${username}`);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 px-0">
            <ul className="nav nav-tabs" role="tablist">
              <li className="nav-item" onClick={() => setSelectedTag("")}>
                <a
                  className={`nav-link ${
                    activeTab === "global-feed" && !selectedItem ? "active" : ""
                  }`}
                  href="#global"
                  role="tab"
                  data-toggle="tab"
                  onClick={() => {
                    setActiveTab("global-feed");
                    fetchGlobalFeed();
                    navigate(`/global-feed`);
                  }}
                >
                  Global feeds
                </a>
              </li>
              {token && (
                <li className="nav-item" onClick={() => setSelectedTag("")}>
                  <a
                    className={`nav-link ${
                      activeTab === "my-feed" && !selectedItem ? "active" : ""
                    }`}
                    href="#local"
                    role="tab"
                    data-toggle="tab"
                    onClick={() => {
                      setActiveTab("my-feed");
                      fetchMyFeed();
                      navigate(`/my-feed`);
                    }}
                  >
                    My feeds
                  </a>
                </li>
              )}
              {selectedItem && (
                <li className="nav-item">
                  <a
                    className={`nav-link ${selectedItem ? "active" : ""}`}
                    href="#by-tag"
                    role="tab"
                    data-toggle="tab"
                    onClick={() => {
                      setActiveTab("tag");
                      fetchTagFeed();
                      navigate(`/tag/${selectedItem}`);
                    }}
                  >
                    #{selectedItem}
                  </a>
                </li>
              )}
              <SelectPerPage limit={limit} setLimit={setLimit} />
            </ul>
            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="global"
                role="tabpanel"
              >
                <div className="container">
                  <div className="row mb-20px blog-post">
                    <div className="col-lg-12 px-0">
                      {feed ? (
                        <>
                          {feed.articles.map((article) => {
                            return (
                              <article key={article.slug}>
                                <div className="entry-content-wrapper">
                                  <button
                                    onClick={() =>
                                      handleFavorite(
                                        article.slug,
                                        article.favorited
                                      )
                                    }
                                    className="btn btn-outline-danger py-1 px-2 rounded btn-like box-shadow-none"
                                  >
                                    <i
                                      className={
                                        article.favorited
                                          ? "bx bxs-heart pr-1"
                                          : "bx bx-heart pr-1"
                                      }
                                    ></i>
                                    <span>{article.favoritesCount}</span>
                                  </button>
                                  <div className="entry-meta-top">
                                    <span className="entry-meta-category">
                                      <Link
                                        to=""
                                        onClick={(e) =>
                                          handleNavigateProfile(
                                            e,
                                            article.author.username
                                          )
                                        }
                                      >
                                        {article.author.username}
                                      </Link>
                                    </span>
                                    <span className="post-meta-date">
                                      {formattedDate(article.createdAt)}
                                    </span>
                                  </div>
                                  <h5 className="entry-title">
                                    <Link to={`article-detail/${article.slug}`}>
                                      {article.title}
                                    </Link>
                                  </h5>
                                  <div className="entry-content">
                                    <p>{article.body}</p>
                                  </div>
                                  <Link
                                    className="entry-read-more"
                                    to={`article-detail/${article.slug}`}
                                  >
                                    Read More
                                    <i className="fas fa-long-arrow-alt-right ml-1"></i>
                                  </Link>
                                </div>
                              </article>
                            );
                          })}

                          {feed.articlesCount < limit ? (
                            <></>
                          ) : (
                            <Pgn
                              current={current}
                              setCurrent={setCurrent}
                              perPage={limit}
                              total={feed.articlesCount}
                              setOffset={setOffset}
                              offset={offset}
                            />
                          )}
                        </>
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

              <div className="tab-pane fade" id="local" role="tabpanel">
                <div className="container">
                  <div className="row mb-20px blog-post">
                    <div className="col-lg-12 px-0">
                      {feed ? (
                        <>
                          {feed.articles.map((article) => {
                            return (
                              <article key={article.slug}>
                                <div className="entry-content-wrapper">
                                  <button
                                    onClick={() =>
                                      handleFavorite(
                                        article.slug,
                                        article.favorited
                                      )
                                    }
                                    className="btn btn-outline-danger py-1 px-2 rounded btn-like box-shadow-none"
                                  >
                                    <i
                                      className={
                                        article.favorited
                                          ? "bx bxs-heart pr-1"
                                          : "bx bx-heart pr-1"
                                      }
                                    ></i>
                                    <span>{article.favoritesCount}</span>
                                  </button>
                                  <div className="entry-meta-top">
                                    <span className="entry-meta-category">
                                      <Link
                                        to=""
                                        onClick={(e) =>
                                          handleNavigateProfile(
                                            e,
                                            article.author.username
                                          )
                                        }
                                      >
                                        {article.author.username}
                                      </Link>
                                    </span>
                                    <span className="post-meta-date">
                                      {formattedDate(article.createdAt)}
                                    </span>
                                  </div>
                                  <h5 className="entry-title">
                                    <Link to={`article-detail/${article.slug}`}>
                                      {article.title}
                                    </Link>
                                  </h5>
                                  <div className="entry-content">
                                    <p>{article.body}</p>
                                  </div>
                                  <Link
                                    className="entry-read-more"
                                    to={`article-detail/${article.slug}`}
                                  >
                                    Read More
                                    <i className="fas fa-long-arrow-alt-right ml-1"></i>
                                  </Link>
                                </div>
                              </article>
                            );
                          })}

                          {feed.articlesCount < limit ? (
                            <></>
                          ) : (
                            <Pgn
                              current={current}
                              setCurrent={setCurrent}
                              perPage={limit}
                              total={feed.articlesCount}
                              setOffset={setOffset}
                              offset={offset}
                            />
                          )}
                        </>
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

              <div className="tab-pane fade" id="by-tag" role="tabpanel">
                <div className="container">
                  <div className="row mb-20px blog-post">
                    <div className="col-lg-12 px-0">
                      {feed ? (
                        <>
                          {feed.articles.map((article) => {
                            return (
                              <article key={article.slug}>
                                <div className="entry-content-wrapper">
                                  <button
                                    onClick={() =>
                                      handleFavorite(
                                        article.slug,
                                        article.favorited
                                      )
                                    }
                                    className="btn btn-outline-danger py-1 px-2 rounded btn-like box-shadow-none"
                                  >
                                    <i
                                      className={
                                        article.favorited
                                          ? "bx bxs-heart pr-1"
                                          : "bx bx-heart pr-1"
                                      }
                                    ></i>
                                    <span>{article.favoritesCount}</span>
                                  </button>
                                  <div className="entry-meta-top">
                                    <span className="entry-meta-category">
                                      <Link
                                        to=""
                                        onClick={(e) =>
                                          handleNavigateProfile(
                                            e,
                                            article.author.username
                                          )
                                        }
                                      >
                                        {article.author.username}
                                      </Link>
                                    </span>
                                    <span className="post-meta-date">
                                      {formattedDate(article.createdAt)}
                                    </span>
                                  </div>
                                  <h5 className="entry-title">
                                  <Link to={`article-detail/${article.slug}`}>
                                      {article.title}
                                    </Link>
                                  </h5>
                                  <div className="entry-content">
                                    <p>{article.body}</p>
                                  </div>
                                  <Link
                                    className="entry-read-more"
                                    to={`article-detail/${article.slug}`}
                                  >
                                    Read More
                                    <i className="fas fa-long-arrow-alt-right ml-1"></i>
                                  </Link>
                                </div>
                              </article>
                            );
                          })}

                          {feed.articlesCount < limit ? (
                            <></>
                          ) : (
                            <Pgn
                              current={current}
                              setCurrent={setCurrent}
                              perPage={limit}
                              total={feed.articlesCount}
                              setOffset={setOffset}
                              offset={offset}
                            />
                          )}
                        </>
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
  );
}
