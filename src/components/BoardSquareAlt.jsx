/// board square
import React, { useState, useEffect, useMemo } from "react";

import Square from "./Square";

const BoardSquareAlt = ({ children }) => {
  return useMemo(() => {
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
  }, [children]);
};

export default BoardSquareAlt;
