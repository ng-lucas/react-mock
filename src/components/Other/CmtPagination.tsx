import { pgnProps } from "../../types";

export default function CmtPgn({
  current,
  setCurrent,
  perPage,
  total,
  setOffset,
  offset,
}: pgnProps) {
  const totalPages = Math.ceil(total / perPage);

  const handleNextClick = (id: number) => {
    setCurrent(id);
    setOffset(offset + perPage);
  };

  const handlePrevClick = (id: number) => {
    setCurrent(id);
    setOffset(offset - perPage);
  };

  const handleFirstClick = (id: number) => {
    setCurrent(id);
    setOffset(0);
  };

  const handleLastClick = (id: number) => {
    setCurrent(id);
    setOffset(total - perPage);
  };

  return (
    <div className="justify-content-center">
      <nav className="pagination-holder mb-80px">
        <ul className="pagination">
          {current > 2 ? (
            <li className="page-item" onClick={() => handleFirstClick(1)}>
              <a className="page-link">{"<<"}</a>
            </li>
          ) : (
            <></>
          )}
          {current > 1 ? (
            <li
              className="page-item"
              onClick={() => handlePrevClick(current - 1)}
            >
              <a className="page-link">{"<"}</a>
            </li>
          ) : (
            <></>
          )}

          {current > 2 && current !== 3 ? (
            <li className="page-item disabled">
              <a className="page-link">{"..."}</a>
            </li>
          ) : (
            <></>
          )}

          {current >= 2 ? (
            <li
              className="page-item"
              onClick={() => handlePrevClick(current - 1)}
            >
              <a className="page-link">{current - 1}</a>
            </li>
          ) : (
            <></>
          )}

          <li className="page-item active">
            <a className="page-link">{current}</a>
          </li>

          {current < totalPages ? (
            <li
              className="page-item"
              onClick={() => handleNextClick(current + 1)}
            >
              <a className="page-link">{current + 1}</a>
            </li>
          ) : (
            <></>
          )}

          {current < totalPages - 1 && current !== totalPages - 2 ? (
            <li className="page-item disabled">
              <a className="page-link">{"..."}</a>
            </li>
          ) : (
            <></>
          )}

          {current < totalPages ? (
            <li
              className="page-item"
              onClick={() => handleNextClick(current + 1)}
            >
              <a className="page-link">{">"}</a>
            </li>
          ) : (
            <></>
          )}
          {current < totalPages - 1 ? (
            <li
              className="page-item"
              onClick={() => handleLastClick(totalPages)}
            >
              <a className="page-link">{">>"}</a>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </nav>
    </div>
  );
}
