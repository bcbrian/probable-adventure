/// board square
import React, { useState, useEffect, useMemo } from "react";

import Overlay from "./Overlay";
import Square from "./Square";

const BoardSquare = ({ x, y, children, setLocalPlayer, canMoveHere }) => {
  return useMemo(() => {
    // console.log("change >> ");
    return (
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
        {canMoveHere && <Overlay color="green" />}
      </div>
    );
  }, [x, y, children, setLocalPlayer, canMoveHere]);
};

export default BoardSquare;
