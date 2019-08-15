import React from "react";
import { Box, Heading } from "grommet";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import Database from "../firebase/containers/Database";
import BoardController from "../components/BoardController";

function Initiative({ user, match, location, history }) {
  return (
    <Database dataRef={`/initiativeData/${match.params.initiativeId}`}>
      {({
        data: initiativeData,
        update: initiativeUpdate,
        create: initiativeCreate,
        custom: initiativeCustom
      }) => {
        if (!initiativeData) {
          return <div>ask your dm for access...</div>;
        }
        return (
          <div>
            <Heading margin="none">{initiativeData.name}</Heading>
            <Box>
              <DndProvider backend={HTML5Backend}>
                <BoardController
                  width={initiativeData.size.x}
                  height={initiativeData.size.y}
                  players={initiativeData.players}
                  setPlayerPos={(playerId, position) =>
                    initiativeUpdate(position, `/players/${playerId}/position`)
                  }
                />
              </DndProvider>
            </Box>
          </div>
        );
      }}
    </Database>
  );
}

export default Initiative;
