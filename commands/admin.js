const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://3dd1a874b960468685862e533b63c559@o376518.ingest.sentry.io/5197414' });

var admin = require('firebase-admin');
var serviceAccount = require("../helsinkicruises-firebase-adminsdk-35i3k-deb8a8b7ab.json");
var db = admin.firestore();

const Discord = require('discord.js');

exports.run = (client, message, args) => {

    if (!message.member.hasPermission('ADMINISTRATOR')) {
        message.channel.send(new Discord.RichEmbed()
        .setTitle("Error!")
        .setColor("#ff0000")
        .setDescription("You aren't an HC Discord administrator, so you have no permission to run this command.")).then(msg => {

            msg.delete(5000);
            message.delete(5000)
        
          })
        return;
    }

    if (args[0] == "status") {

        const ref = db.collection('instillinger');

        let setRef = ref.doc('bot').update({
            status: args.join(' ').split(args[0])[1]
          }, {merge: true});

        client.user.setActivity(args.join(' ').split(args[0])[1]);

    } else

    if (args[0] == "updateavatar") {

        const ref = db.collection('instillinger');

        let setRef = ref.doc('bot').update({
            avatar: client.guilds.get("529631776625131520").iconURL
          }, {merge: true});

          client.user.setAvatar(client.guilds.get("529631776625131520").iconURL);

    } else

    if (args[0] == "name") {

        const ref = db.collection('instillinger');

        let setRef = ref.doc('bot').update({
            username: args.join(' ').split(args[0])[1]
          }, {merge: true});

        client.user.setUsername(args.join(' ').split(args[0])[1]);

    } else

    if (args[0] == "help") {

        

    } else

    if (args[0] == "unvall") {

      const guild = '529631776625131520';
      const testguild = '697577297326374974';

      message.channel.guild.members.forEach(member => {

        if (member.user.bot) return;

        member.removeRoles(member.roles).then(() => {

          member.addRole(client.guilds.get(guild).roles.get('535134616604901378'));
          //member.addRole(client.guilds.get(testguild).roles.get('698573605868404747'));

        })

      })

  } 

}
