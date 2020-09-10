import React from "react";

const Search = ({ handleSearch }) => {
  return (
    <div>
      <p>Find countries:</p>
      <input type="text" onChange={handleSearch} />
    </div>
  );
};

export default Search;
