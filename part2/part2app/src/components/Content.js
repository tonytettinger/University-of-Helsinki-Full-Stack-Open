import React from "react";
import Part from "./Part";

const Content = ({ course }) => {
  console.log(course.parts[0], "course");
  const parts = course.parts;
  return (
    <div>
      {parts.map((course, index) => {
        console.log(index, index);
        return <Part part={parts[index]} key={parts[index].id} />;
      })}
    </div>
  );
};

export default Content;
