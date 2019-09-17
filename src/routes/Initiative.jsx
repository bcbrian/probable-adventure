import React, { useReducer, useEffect } from "react";
import { Box, Heading } from "grommet";

import Database from "../firebase/containers/Database";
import BoardController from "../components/BoardController";

export const InitiativeContext = React.createContext({
  state: null,
  dispatch: () => console.error("We are not ready yet dude!")
});

const testData = {
  name: "test39",
  players: {
    p1: { position: { x: 0, y: 0 } },
    p2: { position: { x: 1, y: 0 } },
    p3: { position: { x: 1, y: 1 } },
    p4: { position: { x: 0, y: 1 } },
    p5: { position: { x: 2, y: 2 } }
  },
  size: { x: 100, y: "100" },
  activePlayer: null // TODO: GLOBAL?
};

const initialState = {};

function reducer(state, action) {
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$", state, action);
  switch (action.type) {
    case "LOAD_DATA_FROM_DB":
      return action.payload;
    case "MOVE_USER":
      const { position } = action.payload;
      const playerId = state.activePlayer.id;
      return {
        ...state,
        players: {
          ...state.players,
          [playerId]: {
            ...state.players[playerId],
            position
          }
        },
        activePlayer: null
      };
    case "SET_ACTIVE_PLAYER":
      return {
        ...state,
        activePlayer: action.payload
      };
    default:
      throw new Error();
  }
}

function InitiativeRender({
  initiativeData,
  initiativeUpdate,
  initiativeCreate,
  initiativeCustom
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "LOAD_DATA_FROM_DB", payload: initiativeData });
  }, [initiativeData]);
  console.log(JSON.stringify(initiativeData));
  return (
    <InitiativeContext.Provider
      value={{
        state,
        dispatch,
        initiativeUpdate,
        initiativeCreate,
        initiativeCustom
      }}
    >
      <Heading margin="none">{initiativeData.name}</Heading>
      <Box>
        <BoardController
        // width={initiativeData.size.x}
        // height={initiativeData.size.y}
        // players={initiativeData.players}
        // setPlayerPos={(playerId, position) =>
        //   initiativeUpdate(position, `/players/${playerId}/position`)
        // }
        />
      </Box>
    </InitiativeContext.Provider>
  );
}

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
          <InitiativeRender
            initiativeData={initiativeData}
            initiativeUpdate={initiativeUpdate}
            initiativeCreate={initiativeCreate}
            initiativeCustom={initiativeCustom}
          />
        );
      }}
    </Database>
  );
}

export default Initiative;
