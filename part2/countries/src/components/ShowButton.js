import React from "react";

const ShowButton = ({ setSingleResult, result }) => {
  const showCountry = result => {
    setSingleResult(result);
  };
  return (
    <>
      <button onClick={() => showCountry(result)}>Show</button>
    </>
  );
};

export default ShowButton;
