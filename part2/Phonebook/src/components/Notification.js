import React from "react";

const Notification = ({ message, success }) => {
  if (message === null) {
    return null;
  }
  const errorStyle = {
    color: "red",
    backgroundColor: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };

  const successStyle = {
    color: "green",
    backgroundColor: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };

  return <div style={success ? successStyle : errorStyle}>{message}</div>;
};

export default Notification;
