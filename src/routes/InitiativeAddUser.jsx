import React, { useState } from "react";
import { Button, TextInput } from "grommet";

import Database from "../firebase/containers/Database";

export default function({ user, match }) {
  // alert(`making the special code!: ${shortid.generate()}`)
  const [id, setId] = useState("");
  const nameState = useState("");
  const name = nameState[0];
  const setName = nameState[1];

  return (
    <Database dataRef={`/members/${match.params.initiativeId}`}>
      {({
        data: memberData,
        update: memberUpdate,
        create: memberCreate,
        custom: memberCustom
      }) => {
        return (
          <>
            <TextInput
              value={id}
              onChange={event => setId(event.target.value)}
            />
            <TextInput
              value={name}
              onChange={event => setName(event.target.value)}
            />
            <Button
              onClick={() => {
                memberUpdate({
                  ...memberData,
                  [id]: name
                });
              }}
              label="+"
            />
            {memberData &&
              Object.keys(memberData).map(key => (
                <div>
                  {key} : {memberData[key]}
                  <Button
                    onClick={() => {
                      memberUpdate({
                        ...memberData,
                        [key]: null
                      });
                    }}
                    label="-"
                  />
                </div>
              ))}
          </>
        );
      }}
    </Database>
  );
}
