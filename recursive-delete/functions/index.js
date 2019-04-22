const functions = require('firebase-functions');
const admin = require('firebase-admin');
const firebase_tools = require('firebase-tools');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


// exports.recursiveDelete = functions
//   .runWith({
//     timeoutSeconds: 540,
//     memory: '2GB'
//   })
//   .https.onCall((data, context) => {
//     // Only allow admin users to execute this function.
//     // if (!(context.auth && context.auth.token && context.auth.token.admin)) {
//     //   throw new functions.https.HttpsError(
//     //     'permission-denied',
//     //     'Must be an administrative user to initiate delete.'
//     //   );
//     // }
//
//     const path = data.path;
//     console.log(
//       `User ${context.auth.uid} has requested to delete path ${path}`
//     );
//
//     // Run a recursive delete on the given document or collection path.
//     // The 'token' must be set in the functions config, and can be generated
//     // at the command line by running 'firebase login:ci'.
//     return firebase_tools.firestore
//       .delete(path, {
//         project: process.env.GCLOUD_PROJECT,
//         recursive: true,
//         yes: true,
//         token: functions.config().fb.token
//       })
//       .then(() => {
//         return {
//           path: path
//         };
//       });
//   });


  exports.deleteList = functions.firestore
      .document('lists_meta/{userId}/personal_lists/{listId}')
      .onDelete((snap, context) => {
        // Get an object representing the document prior to deletion
        // e.g. {'name': 'Marie', 'age': 66}
        const deletedList = snap.data();
        let path = `lists_content/${deletedList.listContentKey}`
        return firebase_tools.firestore
          .delete(path, {
            project: process.env.GCLOUD_PROJECT,
            recursive: true,
            yes: true,
            token: functions.config().fb.token
          })
          .then(() => {
            return {
              path: path
            };
          });

        // perform desired operations ...
      });
