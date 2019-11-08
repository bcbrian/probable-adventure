import React from "react";
import { firebase } from "./";

export const AUTHENTICATING = "AUTHENTICATING";
export const UserContext = React.createContext(AUTHENTICATING);

export function signInViaGitHubPopUp() {
  const provider = new firebase.auth.GithubAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      // const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log("USER: ", user);
      // ...
    })
    .catch(function(error) {
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // // The email of the user's account used.
      // const email = error.email;
      // // The firebase.auth.AuthCredential type that was used.
      // const credential = error.credential;
      // ...
    });
}
export function signInViaGitHubRedirect() {
  const provider = new firebase.auth.GithubAuthProvider();
  firebase.auth().signInWithRedirect(provider);
}

export function getRedirectResult(callback) {
  firebase
    .auth()
    .getRedirectResult()
    .then(function({ user }) {
      callback && typeof callback === "function" && callback(user);
    })
    .catch(function(error) {
      // Handle Errors here.
      console.log(error);
    });
}

export function signInWithEmailLink(email) {
  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be whitelisted in the Firebase Console.
    url: "https://1r9mg.csb.app",
    // This must be true.
    handleCodeInApp: true
  };
  firebase
    .auth()
    .sendSignInLinkToEmail(email, actionCodeSettings)
    .then(function() {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      window.localStorage.setItem("emailForSignIn", email);
    })
    .catch(function(error) {
      // Some error occurred, you can inspect the code: error.code
    });
}

export function handleSignInWithEmailLink() {
  // Confirm the link is a sign-in with email link.
  console.log("hi");
  if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
    console.log("yo");
    // Additional state parameters can also be passed via URL.
    // This can be used to continue the user's intended action before triggering
    // the sign-in operation.
    // Get the email if available. This should be available if the user completes
    // the flow on the same device where they started it.
    const email = window.localStorage.getItem("emailForSignIn");
    console.log("test => ", email);
    if (!email) {
      // User opened the link on a different device. To prevent session fixation
      // attacks, ask the user to provide the associated email again. For example:
      // email = window.prompt("Please provide your email for confirmation");
    }
    // The client SDK will parse the code from the link for you.
    firebase
      .auth()
      .signInWithEmailLink(email, window.location.href)
      .then(function(result) {
        // Clear email from storage.
        window.localStorage.removeItem("emailForSignIn");
        // You can access the new user via result.user
        console.log("user", result);
        // Additional user info profile not available via:
        // result.additionalUserInfo.profile == null
        // You can check if the user is new or existing:
        // result.additionalUserInfo.isNewUser
      })
      .catch(function(error) {
        // Some error occurred, you can inspect the code: error.code
        // Common errors could be invalid email and invalid or expired OTPs.
      });
  }
}

export function emailAndPasswordSignUp(email, password) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // ...
    });
}
export function emailAndPasswordSignIn(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // ...
    });
}

export function signOut() {
  firebase
    .auth()
    .signOut()
    .then(function() {
      // Sign-out successful.
      console.log("signed out!");
    })
    .catch(function(error) {
      // An error happened.
    });
}

export function onAuthStateChanged(cb) {
  return firebase.auth().onAuthStateChanged(function(user) {
    console.log("YIKES!", user);
    cb && typeof cb === "function" && cb(user);
  });
}
