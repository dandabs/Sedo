const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://3dd1a874b960468685862e533b63c559@o376518.ingest.sentry.io/5197414' });

var admin = require('firebase-admin');

var serviceAccount = require("../helsinkicruises-firebase-adminsdk-35i3k-deb8a8b7ab.json");

var db = admin.firestore();

const axios = require('axios');

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

    setInterval(() => {

      client.guilds.get('529631776625131520').channels.get('701387399523074109').setName("Discord Members: " + client.guilds.get('529631776625131520').members.size);
      //client.guilds.get('529631776625131520').channels.get('701386093475397724').setName("Verified Members: " + client.guilds.get('529631776625131520').roles.get('535134591087018001').members.size);

      axios.get("https://groups.roblox.com/v1/groups/4430859")
      .then(response => {
        
        client.guilds.get('529631776625131520').channels.get('701388975494922280').setName("Group Members: " + response.data.memberCount);

      }).catch(error => {});

  }, 5000);
 
    client.guilds.get('529631776625131520').channels.get('535131848821702657').send('<@&535134616604901378> Hyvää päivää! Please verify your accounts *now* using `!verify (username)`. Verification is important to us here at Helsinki Cruises, and pings will stop immediately after you verify your account. Thank you :)');

  setInterval(() => {

    client.guilds.get('529631776625131520').channels.get('535131848821702657').send('<@&535134616604901378> Hyvää päivää! Please verify your accounts *now* using `!verify (username)`. Verification is important to us here at Helsinki Cruises, and pings will stop immediately after you verify your account. Thank you :)');

}, 1200000);

}
