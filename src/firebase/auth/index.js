import { auth } from '../../firebase';

/**
 * Handles the sign up button press.
 */
export function handleSignUp({ email, password }) {
  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }

  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }

  auth.createUserWithEmailAndPassword(email, password).catch(error => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode === 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  });
}

/**
 * Handles the sign in button press.
 */
export function handleSignIn({ email, password }) {
  if (auth.currentUser) {
    auth.signOut();
  } else {
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }
    auth.signInWithEmailAndPassword(email, password).catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
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
export function handleSignOut() {
  if (auth.currentUser) {
    auth.signOut();
  } else {
    console.warn('No user to log out');
  }
}

/**
 * Sends an email verification to the user.
 */
export function sendEmailVerification() {
  auth.currentUser.sendEmailVerification().then(() => {
    alert('Email Verification Sent!');
  });
}
export function sendPasswordReset({ email }) {
  auth
    .sendPasswordResetEmail(email)
    .then(() => {
      alert('Password Reset Email Sent!');
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === 'auth/invalid-email') {
        alert(errorMessage);
      } else if (errorCode === 'auth/user-not-found') {
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
