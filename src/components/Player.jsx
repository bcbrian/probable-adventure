//player
import React, { useState, useMemo, useContext } from "react";
import { InitiativeContext } from "../routes/Initiative";

const playerStyle = {
  fontSize: 40,
  fontWeight: "bold",
  cursor: "move",
  color: "rebeccapurple",
  width: "75%",
  height: "75%",
  backgroundColor: "rebeccapurple"
};
const Player = ({ playerId, player }) => {
  const { state, dispatch } = useContext(InitiativeContext);

  return (
    <>
      <div
        onClick={() =>
          dispatch({
            type: "SET_ACTIVE_PLAYER",
            payload: { id: playerId, ...player }
          })
        }
        style={{
          ...playerStyle
          // opacity: isDragging ? 0.6 : 1
        }}
      />
    </>
  );
};

export default Player;
