import React, { useEffect, useState } from 'react';
import firebase from 'firebase';

const FirebaseContext = React.createContext({
  // default firebase context
});

export default function Firebase({ config, children }) {
  const [fb, setFb] = useState({
    firebase: null,
    database: null,
    auth: null
  });

  useEffect(() => {
    console.log('=> ', config);
    firebase.initializeApp(config);
    const database = firebase.database();
    const auth = firebase.auth();

    setFb({
      firebase,
      database,
      auth
    });
  }, [config.apiKey]);

  console.log('FB YO: ', fb);

  return (
    <FirebaseContext.Provider value={{ ...fb }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export { FirebaseContext };

// export const database = firebase.database();
// export const auth = firebase.auth();
