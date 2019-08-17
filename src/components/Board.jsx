/// borad
import React, { useState, useMemo } from "react";

import Player from "./Player";
import BoardSquare from "./BoardSquare";
import BoardSquareAlt from "./BoardSquareAlt";

/** Styling properties applied to the board element */
const boardStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexWrap: "wrap"
};

//
const renderPlayer = (x, y, players, setDraggingPlayer) => playerId => {
  const player = players[playerId];
  const isPlayerHere = x === player.position.x && y === player.position.y;
  if (isPlayerHere) {
    console.log(x, y, player);
  }
  return isPlayerHere ? (
    <Player
      key={playerId}
      playerId={playerId}
      setDraggingPlayer={setDraggingPlayer}
      player={player}
    />
  ) : null;
};

//
function RenderSquare({
  i,
  width,
  squareStyle2,
  setLocalPlayer,
  players,
  setDraggingPlayer
}) {
  const x = i % width;
  const y = Math.floor(i / width);
  const canMoveHere = Object.values(players).some(player => {
    const { position, speed } = player || {};
    const distance = 1; // speed / 5;
    const { x: playerX, y: playerY } = position || {};
    return (
      playerX - distance <= x &&
      x - distance <= playerX &&
      playerY - distance <= y &&
      y - distance <= playerY
    );
  });

  return (
    <div key={i} style={squareStyle2}>
      {canMoveHere && (
        <BoardSquare x={x} y={y} setLocalPlayer={setLocalPlayer}>
          {Object.keys(players).map(
            renderPlayer(x, y, players, setDraggingPlayer)
          )}
          {x},{y}
        </BoardSquare>
      )}
      {!canMoveHere && (
        <BoardSquareAlt x={x} y={y} setLocalPlayer={setLocalPlayer}>
          {Object.keys(players).map(
            renderPlayer(x, y, players, setDraggingPlayer)
          )}
          {x},{y}
        </BoardSquareAlt>
      )}
    </div>
  );
}

/**
 * The chessboard component
 * @param props The react props
 */
const Board = ({ players, setLocalPlayer, height, width }) => {
  const [draggingPlayer, setDraggingPlayer] = useState(null);
  console.log("DRAGING PLAYER >>>> ", draggingPlayer);
  /** Styling properties applied to each square element */
  const squareStyle2 = {
    width: `calc(100% / ${width})`,
    height: `calc(100% / ${height})`
  };

  const looper = useMemo(
    () => Array.apply(null, Array(width * height)).map(() => null),
    [width, height]
  );

  const squareProps = {
    width,
    draggingPlayer,
    squareStyle2,
    setLocalPlayer,
    players,
    setDraggingPlayer
  };

  return (
    <div style={boardStyle}>
      {looper.map((a, i) => (
        <RenderSquare key={i} i={i} {...squareProps} />
      ))}
    </div>
  );
};

export default Board;
