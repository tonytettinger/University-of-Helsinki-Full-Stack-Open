import React from "react";

const Search = ({ handleSearch, toShow }) => {
  return (
    <div>
      filter shown with <input value={toShow} onChange={handleSearch} />
    </div>
  );
};

export default Search;
