import React, { useState } from "react";
import { Button, TextInput } from "grommet";

import Database from "../firebase/containers/Database";

function NewInitiative({ user, match, location, history }) {
  const [value, setValue] = useState("");
  const [sizeX, setSizeX] = useState(3);
  const [sizeY, setSizeY] = useState(3);
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
            <TextInput
              value={sizeX}
              onChange={event => setSizeX(event.target.value)}
            />
            <TextInput
              value={sizeY}
              onChange={event => setSizeY(event.target.value)}
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
                        x: sizeX,
                        y: sizeY
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
                  history.push(`/initiatives/${initId}`);
                });
              }}
            />
          </div>
        );
      }}
    </Database>
  );
}

export default NewInitiative;
