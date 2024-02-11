import { useCallback, useEffect, useState } from "react";
import { ArticleDataReturn } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { FEED } from "../../saga/actionTypes";
import { Link } from "react-router-dom";
import "./Search.module.css";

export default function SearchBar() {
  const result = useSelector((state: RootState) => state.feed.search);
  const dispatch = useDispatch();
  const [searchResult, setSearchResult] = useState<
    ArticleDataReturn[] | undefined
  >([]);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    dispatch({
      type: FEED.SEARCH,
    });
  }, [dispatch]);

  const search = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      e.preventDefault();
      const value = e.currentTarget.value.trim();
      setInputValue(value);
      if (value) {
        const answer: ArticleDataReturn[] | undefined = result?.articles.filter(
          (article) => article.title.toLowerCase().indexOf(value) > -1
        );
        setSearchResult(answer);
      } else {
        setSearchResult([]);
      }
    },
    [result?.articles]
  );

  return (
    <div className="">
      <form
        className="form-group mb-0 search-form"
        style={{
          border: "1px solid hsla(0, 0%, 0%, 0.125)",
        }}
        role="search"
      >
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            placeholder="Search"
            name="search"
            onKeyUp={(e) => search(e)}
          />
          <div className="input-group-append ">
            <button className="btn disabled" type="button">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </form>

      {inputValue !== "" ? (
        <ul
          className="list-group position-absolute"
        >
          <div
            className="search-results"
          >
            {searchResult?.map((article) => (
              <li
                key={article.slug}
                className="list-group-item"
              >
                <div className="entry-content-wrapper ">
                  <Link
                    className="d-flex justify-content-between align-items-center"
                    to={`/article-detail/${article.slug}`}
                    onClick={() => {
                      setInputValue("");
                      setSearchResult([]);
                    }}
                  >
                    <div className="col-11">
                      <h5 className="entry-title text-truncate">
                        {article.title}
                      </h5>
                      <p className="entry-content mb-2 text-truncate">
                        {article.description}
                      </p>
                    </div>
                    <div>
                      <i className="fas fa-long-arrow-alt-right ml-1"></i>
                    </div>
                  </Link>
                </div>
              </li>
            ))}
          </div>
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
}
