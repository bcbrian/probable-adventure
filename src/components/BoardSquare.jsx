/// board square
import React, { useState, useEffect, useMemo } from "react";

import Overlay from "./Overlay";
import Square from "./Square";
import ItemTypes from "../constants/itemTypes";

const BoardSquare = ({ x, y, children, setLocalPlayer }) => {
  return useMemo(
    () => (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%"
        }}
        onClick={() => setLocalPlayer({ x, y })}
      >
        <Square>{children}</Square>
        {/* {isOver && !canDrop && <Overlay color="red" />} */}
        {/* {!isOver && canDrop && <Overlay color="yellow" />} */}
        <Overlay color="green" />
      </div>
    ),
    [x, y, children, setLocalPlayer]
  );
};

export default BoardSquare;
