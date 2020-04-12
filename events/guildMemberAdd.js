const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://3dd1a874b960468685862e533b63c559@o376518.ingest.sentry.io/5197414' });

var admin = require('firebase-admin');
var serviceAccount = require("../helsinkicruises-firebase-adminsdk-35i3k-deb8a8b7ab.json");
var db = admin.firestore();

module.exports = (client, member) => {

    const guild = '529631776625131520';
    const testguild = '697577297326374974';

    let ref = db.collection('users').doc(member.id);

    let getDoc = ref.get()
  .then(doc => {
    if (doc.exists) {

        member.send(":wave: Thanks for verifying, and welcome to Helsinki Cruises.");
        member.addRole(client.guilds.get(guild).roles.get('535134591087018001'));
        member.removeRole(client.guilds.get(guild).roles.get('535134616604901378'));
        
    } else {

        member.send(":wave: Thanks for joining Helsinki Cruises. You'll need to verify your ROBLOX account before using the server.");
        member.send("Please type `!verify` in the <#535131848821702657> channel to begin.");
        member.addRole(client.guilds.get(guild).roles.get('535134616604901378'));
        member.addRole(client.guilds.get(testguild).roles.get('698573605868404747'));

    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });

  }