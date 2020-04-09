var admin = require('firebase-admin');

var serviceAccount = require("../laatikkonsedo-firebase-adminsdk-4rtn9-2bb94041a9.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://laatikkonsedo.firebaseio.com"
});

var db = admin.firestore();

module.exports = (client) => {

    let ref = db.collection('instillinger').doc('bot');

    let getDoc = ref.get()
  .then(doc => {
    if (doc.exists) {
        client.user.setActivity(doc.data().status);
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });

    console.log(`Ready to serve for a total of ${client.guilds.get("529631776625131520").members.size} amazing HC users.`);
}
