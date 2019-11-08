const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.collaborators = functions.https.onRequest((request, response) => {
  response.send(`
  <h1>Made with squeky horses</h1>
  <ul>
    <li>bcbrian, Brian Bartholomew</li>
    <li>Ben my brother</li>
    <li>Tophergates</li>
    <li>Coop</li>
    <li>RedZane</li>
    <li>Awwyes</li>
    <li>Geek Simplified</li>
  </ul> 
  `);
});
