import React, { useState, useEffect } from "react";

import Board from "./Board";

const BoardController = ({ width, height, players, setPlayerPos }) => {
  const [localPlayers, setLocalPlayers] = useState(players);
  const setLocalPlayer = function(playerId, position) {
    setLocalPlayers({
      ...localPlayers,
      [playerId]: {
        ...localPlayers[playerId],
        position
      }
    });
  };
  // the observe function will return an unsubscribe callback
  useEffect(() => setLocalPlayers(players), [players]);
  // the obove is all about mocking a real time db
  const containerStyle = {
    width: `calc(${width} * 80px)`,
    height: `calc(${height} * 80px)`
  };
  return (
    <div>
      <div style={containerStyle}>
        <Board
          players={players}
          setLocalPlayer={(playerId, position) => {
            setLocalPlayer(playerId, position);
            setPlayerPos(playerId, position);
          }}
          width={width}
          height={height}
        />
      </div>
    </div>
  );
};

export default BoardController;
