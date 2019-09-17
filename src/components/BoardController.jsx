import React, { useMemo, useContext } from "react";

import Board from "./Board";

import { InitiativeContext } from "../routes/Initiative";

const BoardController = ({ setPlayerPos }) => {
  const { state } = useContext(InitiativeContext);
  let width = 0;
  let height = 0;
  if (state.size) {
    width = state.size.x;
    height = state.size.y;
  }

  return useMemo(() => {
    const containerStyle = {
      width: `calc(${width} * 80px)`,
      height: `calc(${height} * 80px)`
    };
    return (
      <div>
        <div style={containerStyle}>
          <Board width={width} height={height} />
        </div>
      </div>
    );
  }, [width, height]);
};

export default BoardController;
