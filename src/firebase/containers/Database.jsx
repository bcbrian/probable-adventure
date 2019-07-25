import React, { useState, useEffect, useContext } from "react";

import { FirebaseContext } from "../";

export default function Database({ children, dataRef, render }) {
  const { database } = useContext(FirebaseContext);

  const [data, setData] = useState(null);

  useEffect(() => {
    console.log("yo connecting:", dataRef);
    const ref = database.ref(dataRef);
    const turnOff = ref.on("value", snapshot => {
      console.log("@#$%^#$%^$%^#$%^", snapshot.val());
      setData(snapshot.val());
    });
    return () => ref.off("value", turnOff);
  }, [dataRef]);

  const update = (value, adjustRef = "") => {
    database.ref(dataRef + adjustRef).set(value);
  };

  const create = (value, adjustRef = "") => {
    database.ref(dataRef + adjustRef).push(value);
  };

  const custom = fn => fn(database.ref(dataRef));

  if (children) {
    return children({
      data,
      update: update,
      create: create,
      custom: custom
    });
  } else if (render) {
    return render({
      data,
      update: update,
      create: create,
      custom: custom
    });
  }
  return <div>You did not provide a render or children prop.</div>;
}
