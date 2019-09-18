import React from "react";
import { Button } from "grommet";
import { Link } from "react-router-dom";

import Database from "../firebase/containers/Database";

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
            <h1>{user.uid}</h1>
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

export default Dashboard;
