/// borad
// TODO: https://github.com/bvaughn/react-virtualized/blob/master/docs/Grid.md#basic-grid-example
import React, { useState, useMemo, useContext } from "react";

import Player from "./Player";
import BoardSquare from "./BoardSquare";
import BoardSquareAlt from "./BoardSquareAlt";

import { InitiativeContext } from "../routes/Initiative";

/** Styling properties applied to the board element */
const boardStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexWrap: "wrap"
};

//
const renderPlayer = (x, y, players) => playerId => {
  const player = players[playerId];
  const isPlayerHere = x === player.position.x && y === player.position.y;
  // if (isPlayerHere) {
  //   console.log(x, y, player);
  // }
  return isPlayerHere ? (
    <Player key={playerId} playerId={playerId} player={player} />
  ) : null;
};

//
function RenderSquare({ i }) {
  const {
    state,
    dispatch,
    initiativeUpdate,
    initiativeCreate,
    initiativeCustom
  } = useContext(InitiativeContext);

  const activePlayer = state.activePlayer;
  const players = state.players;
  const width = state.size.x;
  const height = state.size.y;

  const x = i % width;
  const y = Math.floor(i / width);
  let canMoveHere = false;
  if (activePlayer) {
    const { position, speed } = activePlayer;
    const distance = 6; // speed / 5;
    const { x: playerX, y: playerY } = position || {};
    canMoveHere =
      playerX - distance <= x &&
      x - distance <= playerX &&
      playerY - distance <= y &&
      y - distance <= playerY;
  }

  return useMemo(() => {
    const squareStyle2 = {
      width: `calc(100% / ${width})`,
      height: `calc(100% / ${height})`
    };

    return (
      <div key={i} style={squareStyle2}>
        <BoardSquare
          x={x}
          y={y}
          canMoveHere={canMoveHere}
          setLocalPlayer={
            canMoveHere
              ? position => {
                  initiativeUpdate(
                    position,
                    `/players/${activePlayer.id}/position`
                  );
                  // dispatch({
                  //   type: "MOVE_USER",
                  //   payload: {
                  //     position
                  //   }
                  // })
                }
              : () => {}
          }
        >
          {Object.keys(players).map(renderPlayer(x, y, players))}
          {x},{y}
        </BoardSquare>
      </div>
    );
  }, [x, y, canMoveHere, width, height, dispatch, i]);
}

/**
 * The chessboard component
 * @param props The react props
 */
const Board = ({ height, width }) =>
  useMemo(
    () => (
      <div style={boardStyle}>
        {Array.apply(null, Array(width * height))
          .map(() => null)
          .map((a, i) => (
            <RenderSquare key={i} i={i} />
          ))}
      </div>
    ),
    [width, height]
  );

export default Board;
