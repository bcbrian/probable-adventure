//player
import React from "react";
import { DragPreviewImage, useDrag } from "react-dnd";

import ItemTypes from "../constants/itemTypes";

const playerStyle = {
  fontSize: 40,
  fontWeight: "bold",
  cursor: "move",
  color: "rebeccapurple",
  width: "75%",
  height: "75%",
  backgroundColor: "rebeccapurple"
};
const Player = ({ playerId }) => {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes.PLAYER, playerId },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });
  return (
    <>
      <DragPreviewImage connect={preview} />
      <div
        ref={drag}
        style={{
          ...playerStyle,
          opacity: isDragging ? 0.6 : 1
        }}
      />
    </>
  );
};

export default Player;
