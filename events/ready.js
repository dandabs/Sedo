const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://3dd1a874b960468685862e533b63c559@o376518.ingest.sentry.io/5197414' });

var admin = require('firebase-admin');

var serviceAccount = require("../helsinkicruises-firebase-adminsdk-35i3k-deb8a8b7ab.json");

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
