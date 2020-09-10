import React from "react";
import ShowButton from "./ShowButton";

const Results = ({ results, setSingleResult }) => {
  console.log("Results", results);
  return (
    <ul>
      {results.map((result, index) => {
        return (
          <li key={index}>
            <p>{result.name}</p>
            <ShowButton result={result} setSingleResult={setSingleResult} />
          </li>
        );
      })}
    </ul>
  );
};

export default Results;
