import React, { useState } from "react";
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
  PLAYER: "player",
  NPC: "npc",
  OBSTACLE: "obstacle"
};

//player

const playerStyle = {
  fontSize: 40,
  fontWeight: "bold",
  cursor: "move",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translateX(-50%) translateY(-25%)",
  boxSizing: "border-box"
};
export const Player = () => {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes.PLAYER },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });
  console.log(isDragging);
  return (
    <>
      <DragPreviewImage connect={preview} />
      <div
        ref={drag}
        style={{
          ...playerStyle,
          opacity: isDragging ? 0.1 : 1
        }}
      >
        ◆
      </div>
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
        backgroundColor: color,
        boxSizing: "border-box"
      }}
    />
  );
};

//square

const squareStyle = {
  width: "100%",
  height: "100%",
  border: "1px solid grey",
  boxSizing: "border-box"
};
export const Square = ({ black, children }) => {
  return (
    <div
      style={{
        ...squareStyle
      }}
    >
      {children}
    </div>
  );
};

/// board square

export const BoardSquare = ({ x, y, children, setPlayerPos }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.PLAYER,
    // canDrop: () => canMovePlayer(x, y),
    drop: () => setPlayerPos([x, y]),
    // drop: () => console.log(x, y),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    })
  });
  const black = (x + y) % 2 === 1;
  return (
    <div
      ref={drop}
      style={{
        position: "relative",
        width: "100%",
        height: "100%"
      }}
    >
      <Square black={black}>{children}</Square>
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
  flexWrap: "wrap",
  boxSizing: "border-box"
};
/** Styling properties applied to each square element */
const squareStyle2 = { width: "12.5%", height: "12.5%" };
/**
 * The chessboard component
 * @param props The react props
 */
const Board = ({ playerPosition: [playerX, playerY], setPlayerPos }) => {
  function renderSquare(i) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    return (
      <div key={i} style={squareStyle2}>
        <BoardSquare x={x} y={y} setPlayerPos={setPlayerPos}>
          {renderPiece(x, y)}
        </BoardSquare>
      </div>
    );
  }
  function renderPiece(x, y) {
    const isPlayerHere = x === playerX && y === playerY;
    return isPlayerHere ? <Player /> : null;
  }
  const squares = [];
  for (let i = 0; i < 64; i += 1) {
    squares.push(renderSquare(i));
  }
  return <div style={boardStyle}>{squares}</div>;
};

/// Example

const containerStyle = {
  width: 500,
  height: 500,
  border: "1px solid gray",
  boxSizing: "border-box"
};
/**
 * The Chessboard Tutorial Application
 */
const Example = () => {
  const [playerPos, setPlayerPos] = useState([1, 7]);
  // the observe function will return an unsubscribe callback
  // useEffect(() => observe(newPos => setPlayerPos(newPos)))
  // the obove is all about mocking a real time db
  console.log(playerPos);
  return (
    <div>
      <div style={containerStyle}>
        <Board playerPosition={playerPos} setPlayerPos={setPlayerPos} />
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
                <Example />
              </DndProvider>
            </Box>
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
            <Button onClick={() => alert("go make init :P")} label="+" />
            <div>
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
            </div>
          </>
        );
      }}
    </Database>
  );
}

function App() {
  return (
    <Grommet theme={theme}>
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
