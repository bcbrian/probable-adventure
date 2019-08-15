//square
import React from "react";

const squareStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid black"
};
const Square = ({ black, children }) => {
  const backgroundColor = black ? "black" : "white";
  const color = black ? "white" : "black";
  return (
    <div
      style={{
        ...squareStyle,
        color,
        backgroundColor
      }}
    >
      {children}
    </div>
  );
};

export default Square;
