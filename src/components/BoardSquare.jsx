/// board square
import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";

import Overlay from "./Overlay";
import Square from "./Square";
import ItemTypes from "../constants/itemTypes";

const BoardSquare = ({ x, y, children, setLocalPlayer }) => {
  const [playerId, setPlayerId] = useState(null);
  const [{ isOver, canDrop, item }, drop] = useDrop({
    accept: ItemTypes.PLAYER,
    // canDrop: () => canMoveKnight(x, y),
    drop: () => {
      debugger;
      setLocalPlayer(playerId, { x, y });
      setPlayerId(null);
    },
    // drop: () => console.log(x, y),
    collect: monitor => {
      return {
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
        item: monitor.getItem() || {}
      };
    }
  });

  useEffect(() => {
    setPlayerId(item.playerId);
  }, [item.playerId]);

  return (
    <div
      ref={drop}
      style={{
        position: "relative",
        width: "100%",
        height: "100%"
      }}
    >
      <Square>{children}</Square>
      {/* {isOver && !canDrop && <Overlay color="red" />} */}
      {/* {!isOver && canDrop && <Overlay color="yellow" />} */}
      {isOver && <Overlay color="green" />}
    </div>
  );
};

export default BoardSquare;
