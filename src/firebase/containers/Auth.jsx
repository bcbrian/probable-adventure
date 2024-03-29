/*
  This is the auth container
  it uses a render prop
  it calls the render prop, children prop, with user
  if user is null then they are not authenticated
  it also calls it with the authentication functions
  signUp, signIn, signOut
*/

import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { FirebaseContext } from "../";
// import { handleSignUp, handleSignIn, handleSignOut } from '../auth';

// import { auth } from '../../firebase';

/**
 * Handles the sign up button press.
 */

export default function Auth({ children, render }) {
  const fb = useContext(FirebaseContext);
  const { auth } = fb;
  const [user, setUser] = useState(null);

  useEffect(() => {
    let unsubscribeFromAuthStateChange = () => {};
    if (auth) {
      unsubscribeFromAuthStateChange = auth.onAuthStateChanged(user => {
        setUser(user);
      });
    }
    return unsubscribeFromAuthStateChange;
  }, [auth]);

  function handleSignUp({ email, password }) {
    if (email.length < 4) {
      alert("Please enter an email address.");
      return;
    }

    if (password.length < 4) {
      alert("Please enter a password.");
      return;
    }

    auth.createUserWithEmailAndPassword(email, password).catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/weak-password") {
        alert("The password is too weak.");
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  }

  /**
   * Handles the sign in button press.
   */
  function handleSignIn({ email, password }) {
    if (auth.currentUser) {
      auth.signOut();
    } else {
      if (email.length < 4) {
        alert("Please enter an email address.");
        return;
      }
      if (password.length < 4) {
        alert("Please enter a password.");
        return;
      }
      auth.signInWithEmailAndPassword(email, password).catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          alert("Wrong password.");
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
    }
  }

  /**
   * Handles the sign out button press.
   */
  function handleSignOut() {
    if (auth.currentUser) {
      auth.signOut();
    } else {
      console.warn("No user to log out");
    }
  }

  /**
   * Sends an email verification to the user.
   */
  function sendEmailVerification() {
    auth.currentUser.sendEmailVerification().then(() => {
      alert("Email Verification Sent!");
    });
  }

  function sendPasswordReset({ email }) {
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("Password Reset Email Sent!");
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === "auth/invalid-email") {
          alert(errorMessage);
        } else if (errorCode === "auth/user-not-found") {
          alert(errorMessage);
        }
        console.log(error);
      });
  }
  /* for reference
  export function initApp() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const displayName = user.displayName;
        const email = user.email;
        const emailVerified = user.emailVerified;
        const photoURL = user.photoURL;
        const isAnonymous = user.isAnonymous;
        const uid = user.uid;
        const providerData = user.providerData;
      }
    });
  }
  */

  if (children) {
    return children({
      user,
      handleSignUp,
      handleSignIn,
      handleSignOut,
      sendEmailVerification,
      sendPasswordReset
    });
  } else if (render) {
    return render({
      user,
      handleSignUp,
      handleSignIn,
      handleSignOut,
      sendEmailVerification,
      sendPasswordReset
    });
  }
  return <div>You did not provide a render or children prop.</div>;
}

Auth.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func
};

Auth.defaultProps = {
  children: null,
  render: null
};
