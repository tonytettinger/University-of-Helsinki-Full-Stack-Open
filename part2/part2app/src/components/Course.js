import React from "react";
import Content from "./Content";
import Total from "./Total";
import Header from "./Header";

const Course = ({ course }) => {
  return (
    <div>
      {course.map(current => {
        return (
          <div>
            <Header course={current} />
            <Content course={current} />
            <Total course={current} />
          </div>
        );
      })}
    </div>
  );
};

export default Course;
