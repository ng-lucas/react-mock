import React from "react";

export default function SelectPerPage(props: {
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { setLimit, limit } = props;

  return (
    <div className="form-group ml-auto row flex-nowrap">
      <label
        className="mr-2 my-auto"
        style={{ fontSize: "small" }}
        htmlFor="perpage"
      >
        Articles/Page
      </label>
      <select
        className="form-control form-control-perpage"
        id="perpage"
        defaultValue={limit}
        onChange={(e) => setLimit(parseInt(e.currentTarget.value))}
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  );
}
