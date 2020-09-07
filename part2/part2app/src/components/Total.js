import React from "react";

const Total = ({ course }) => {
  const total = course.parts.reduce((acc, current) => {
    console.log(acc);
    return parseInt(current.exercises) + acc;
  }, 0);
  console.log(total, total);
  return (
    <p>
      <b>total of {total} exercises </b>
    </p>
  );
};

export default Total;
