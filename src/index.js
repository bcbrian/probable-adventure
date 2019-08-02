import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  Box,
  Button,
  Grommet,
  Select,
  Heading,
  FormField,
  TextInput
} from "grommet";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

// import Example from './example'
import { DndProvider, DragPreviewImage, useDrop, useDrag } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import { createGlobalStyle } from "styled-components";

import Firebase from "./firebase";
import Auth from "./firebase/containers/Auth";
import Database from "./firebase/containers/Database";
import Authenticate from "./components/Authenticate";
import TopNav from "./components/TopNav";

import "./styles.css";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "14px",
      height: "20px"
    }
  }
};

//item types

const ItemTypes = {
  PLAYER: "player"
};

//knight

const knightStyle = {
  fontSize: 40,
  fontWeight: "bold",
  cursor: "move",
  color: "rebeccapurple",
  width: "75%",
  height: "75%",
  backgroundColor: "rebeccapurple"
};
export const Player = ({ playerId }) => {
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
          ...knightStyle,
          opacity: isDragging ? 0.6 : 1
        }}
      />
    </>
  );
};

//overlay

const Overlay = ({ color }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color
      }}
    />
  );
};

//square

const squareStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid black"
};
export const Square = ({ black, children }) => {
  const backgroundColor = black ? "black" : "white";
  const color = black ? "white" : "black";
  return (
    <div
      style={{
        ...squareStyle,
        color,
        backgroundColor
      }}
    >
      {children}
    </div>
  );
};

/// board square

export const BoardSquare = ({ x, y, children, setLocalPlayer }) => {
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
      console.log("MONITOR LIZARD ", monitor);
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

/// borad

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
  /** Styling properties applied to each square element */
  const squareStyle2 = {
    width: `calc(100% / ${width})`,
    height: `calc(100% / ${height})`
  };
  function renderSquare(i) {
    const x = i % width;
    const y = Math.floor(i / height);
    return (
      <div key={i} style={squareStyle2}>
        <BoardSquare x={x} y={y} setLocalPlayer={setLocalPlayer}>
          {Object.keys(players).map(renderPlayer(x, y))}
        </BoardSquare>
      </div>
    );
  }
  const renderPlayer = (x, y) => playerId => {
    const player = players[playerId];
    const isPlayerHere = x === player.position.x && y === player.position.y;
    return isPlayerHere ? <Player playerId={playerId} /> : null;
  };
  const squares = [];
  for (let i = 0; i < width * height; i += 1) {
    squares.push(renderSquare(i));
  }
  return <div style={boardStyle}>{squares}</div>;
};

/// ex

/**
 * The Chessboard Tutorial Application
 */
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

function Initiative({ user, match, location, history }) {
  const [value, setValue] = useState("");
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

function NewInitiative({ user, match, location, history }) {
  const [value, setValue] = useState("");
  return (
    <Database dataRef={`/users/${user.uid}`}>
      {({
        data: userData,
        update: userUpdate,
        create: userCreate,
        custom: userCustom
      }) => {
        return (
          <div>
            <h1>CREATING NEW INITIATIVE</h1>
            <TextInput
              value={value}
              onChange={event => setValue(event.target.value)}
            />
            <Button
              label="Create"
              onClick={() => {
                userCustom(ref => {
                  debugger;
                  const initId = ref.push().key;
                  ref.child("initiatives").update({ [initId]: value });
                  ref.root
                    .child("initiatives")
                    .update({ [initId]: { [user.uid]: "owner" } });
                  ref.root
                    .child("members")
                    .child(initId)
                    .update({ [user.uid]: "DM" });
                  ref.root
                    .child("initiativeData")
                    .child(initId)
                    .update({
                      name: value,
                      size: {
                        x: 3,
                        y: 3
                      },
                      players: {
                        p1: {
                          position: {
                            x: 1,
                            y: 1
                          }
                        }
                      }
                    });
                });
              }}
            />
          </div>
        );
      }}
    </Database>
  );
}

function Dashboard({ user, match, location, history }) {
  return (
    <Database dataRef={`/users/${user.uid}`}>
      {({
        data: userData,
        update: userUpdate,
        create: userCreate,
        custom: userCustom
      }) => {
        return (
          <>
            <Button
              onClick={() => history.push("/initiatives/new")}
              label="+"
            />
            <div>
              <h2>Inits You're DM Of</h2>
              {userData &&
                userData.initiatives &&
                Object.keys(userData.initiatives).map(id => {
                  return (
                    <div>
                      <Link to={`/initiatives/${id}`}>
                        {id} -> {userData.initiatives[id]}
                      </Link>
                    </div>
                  );
                })}
              <div>
                <h2>Inits You're Apart Of</h2>
                {userData &&
                  userData.invites &&
                  Object.keys(userData.invites).map(initId => {
                    return (
                      <div>
                        <Link to={`/initiatives/${initId}`}>
                          <span>{userData.invites[initId]}</span>
                        </Link>
                      </div>
                    );
                  })}
              </div>
            </div>
          </>
        );
      }}
    </Database>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    box-sizing: border-box;
  }
`;

function App() {
  return (
    <Grommet theme={theme}>
      <GlobalStyle />
      <Firebase
        config={{
          apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
          authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOAMIN,
          databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
          projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
          storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
        }}
      >
        <Auth>
          {({ user, handleSignOut, handleSignIn, handleSignUp }) => (
            <div>
              <TopNav>
                <Authenticate
                  user={user}
                  onSignOut={handleSignOut}
                  onSignIn={handleSignIn}
                  onSignUp={handleSignUp}
                />
              </TopNav>
              {user && (
                <Router>
                  <Switch>
                    <Route path="/" exact>
                      {routeProps => <Dashboard user={user} {...routeProps} />}
                    </Route>
                    <Route path="/initiatives/new">
                      {routeProps => (
                        <NewInitiative user={user} {...routeProps} />
                      )}
                    </Route>
                    <Route path="/initiatives/:initiativeId">
                      {routeProps => <Initiative user={user} {...routeProps} />}
                    </Route>
                  </Switch>
                </Router>
              )}
            </div>
          )}
        </Auth>
      </Firebase>
    </Grommet>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
