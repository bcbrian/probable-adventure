/// borad
import React, { useState } from "react";

import Player from "./Player";
import BoardSquare from "./BoardSquare";

/** Styling properties applied to the board element */
const boardStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexWrap: "wrap"
};

/**
 * The chessboard component
 * @param props The react props
 */
const Board = ({ players, setLocalPlayer, height, width }) => {
  const [draggingPlayer, setDraggingPlayer] = useState(null);

  /** Styling properties applied to each square element */
  const squareStyle2 = {
    width: `calc(100% / ${width})`,
    height: `calc(100% / ${height})`
  };
  console.log("width, height", width, height);
  function renderSquare(i) {
    const x = i % width;
    const y = Math.floor(i / width);
    const { position, speed } = draggingPlayer || {};
    const distance = 1; // speed / 5;
    const { x: playerX, y: playerY } = position || {};

    return (
      <div key={i} style={squareStyle2}>
        <BoardSquare
          x={x}
          y={y}
          setLocalPlayer={setLocalPlayer}
          canMoveHere={
            playerX - distance <= x &&
            x - distance <= playerX &&
            playerY - distance <= y &&
            y - distance <= playerY
          }
        >
          {Object.keys(players).map(renderPlayer(x, y))}
          {x},{y}
        </BoardSquare>
      </div>
    );
  }
  const renderPlayer = (x, y) => playerId => {
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
  const squares = [];
  for (let i = 0; i < width * height; i += 1) {
    console.log(i);
    squares.push(renderSquare(i));
  }
  return <div style={boardStyle}>{squares}</div>;
};

export default Board;
