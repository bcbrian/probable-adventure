import React, { useMemo, useContext } from "react";

import Board from "./Board";

import { InitiativeContext } from "../routes/Initiative";

const BoardController = ({ setPlayerPos }) => {
  const { state } = useContext(InitiativeContext);
  const width = state.size.x;
  const height = state.size.y;

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
