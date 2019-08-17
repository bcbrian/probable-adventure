/// board square
import React, { useState, useEffect } from "react";

import Square from "./Square";

const BoardSquareAlt = ({ children }) => {
  console.log("non-target");

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%"
      }}
    >
      <Square>{children}</Square>
    </div>
  );
};

export default BoardSquareAlt;
