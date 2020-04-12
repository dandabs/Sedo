const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://3dd1a874b960468685862e533b63c559@o376518.ingest.sentry.io/5197414' });

var admin = require('firebase-admin');

var serviceAccount = require("../helsinkicruises-firebase-adminsdk-35i3k-deb8a8b7ab.json");

var db = admin.firestore();

const Discord = require('discord.js');

exports.run = (client, message, args) => {

    var userid = "";

    if (message.mentions.members.first() || args[0]) {

        if (message.member.hasPermission('ADMINISTRATOR')) {

          if (message.mentions.members.first()) { userid = message.mentions.members.first().id; } else {

            userid = args[0];

          }

        } else {

            message.channel.send(new Discord.RichEmbed()
            .setTitle("Error!")
            .setColor("#ff0000")
            .setDescription("You aren't an HC Discord administrator, so you have no permission to run this command.")).then(msg => {

                msg.delete(5000);
                message.delete(5000)
            
              })


              return;


        }

    } else userid = message.author.id;
    
    let ref = db.collection('users').doc(userid);

    let getDoc = ref.get()
  .then(doc => {
    if (doc.exists) {
        ref.delete();
        message.channel.send(":exclamation: I've deleted the verification user. You can now re-verify using !verify.").then(msg => {

          msg.delete(5000);
          message.delete(5000)
      
        })

        const guild = '529631776625131520';
        const testguild = '697577297326374974';

        client.guilds.get(guild).members.get(userid).removeRoles(client.guilds.get(guild).members.get(userid).roles);
        client.guilds.get(testguild).members.get(userid).removeRoles(client.guilds.get(testguild).members.get(userid).roles);

        client.guilds.get(guild).members.get(req.params.id).addRole(client.guilds.get(guild).roles.get('535134616604901378'));
        client.guilds.get(testguild).members.get(req.params.id).addRole(client.guilds.get(testguild).roles.get('698573605868404747'));

    } else {

        message.channel.send(new Discord.RichEmbed()
        .setTitle("Error!")
        .setColor("#ff0000")
        .setDescription("The requested verified user does not exist.")).then(msg => {

            msg.delete(5000);
            message.delete(5000)
        
          })

    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });

}
