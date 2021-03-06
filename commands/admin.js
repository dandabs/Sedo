const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://3dd1a874b960468685862e533b63c559@o376518.ingest.sentry.io/5197414' });

var admin = require('firebase-admin');
var serviceAccount = require("../helsinkicruises-firebase-adminsdk-35i3k-deb8a8b7ab.json");
var db = admin.firestore();

const Discord = require('discord.js');


const axios = require('axios');

exports.run = (client, message, args) => {

    if (!message.member.hasPermission('ADMINISTRATOR')) {
        message.channel.send(new Discord.RichEmbed()
        .setTitle("Error!")
        .setColor("#ff0000")
        .setDescription("You aren't an HC Discord administrator, so you have no permission to run this command.")).then(msg => {

           // msg.delete(5000);
           // message.delete(5000)
        
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

      message.channel.send(":books: I've sent some help commands to your DMs.").then(msg => {

        //msg.delete(5000);
        //message.delete(5000);

      });

        message.author.send(new Discord.RichEmbed()
        .setColor('#ad0917')
        .setTitle('Admin Help')
        .setURL('https://helsinkicruises.web.app')
        .setDescription('Here are the admin commands for the Helsinki Cruises Discord bot.')
        .addField('!admin status <status>', 'Set the bot\'s playing status to the supplied text.')
        .addField('!admin updateavatar', 'Updates the bot\'s avatar to match the HC server\'s icon.')
        .addField('!admin name <name>', 'Updates the bot\'s username to the supplied text. [ONLY 2 CHANGES PER HOUR].')
        .addField('!admin verify <@mention> <roblox>', 'Force verifies the mentioned user with the supplied ROBLOX username.')
        .addField('!admin unvall', 'Unverifies everyone without admin permissions in the Helsinki Cruises Discord.')
        .addField('!admin say <message>', 'Repeats the given message in the same channel as the command was sent, then deletes the sender\'s message.')
        .addBlankField()
        .addField('!cancelverify <@mention>', 'Cancel the mentioned user\'s request to verify themselves.')
        .addField('!getroles <@mention>', 'Give the mentioned user the role which matches your rank on the HC ROBLOX group.')
        .addBlankField()
        .addField('!dev refresh <command>', 'Refreshes the code in the command file.')
        .setTimestamp());

    } else

    if (args[0] == "say") {

        message.delete();

        message.channel.send(args.join(' ').split(args[0])[1]);

    } else

    if (args[0] == "verify") {

        if (!args[2]) {

        } else {

          var discordid = "";

          if (!message.mentions.members.first()) discordid = args[1];
          if (message.mentions.members.first()) discordid = message.mentions.members.first().id;

          axios.get("https://api.roblox.com/users/get-by-username?username=" + args[2])
          .then(response => {

              if (response.data.success == 'false') {

                  message.channel.send(new Discord.RichEmbed()
                  .setTitle("Error!")
                  .setColor("#ff0000")
                  .setDescription("Something went wrong: " + response.data.success));

              } else {

           const robloxid = args[2] + "";

           const ref3 = db.collection('users');
 
           let setRef3 = ref3.doc(discordid).set({
               roblox: response.data.Id + "",
               timestamp: Math.floor(new Date() / 1000),
               city: "",
               country: ""
             });

             const guild = '529631776625131520';
             const testguild = '697577297326374974';
           
             client.users.get(discordid).sendMessage(':wave: Thanks for verifying, and welcome to Helsinki Cruises.');
             message.channel.send(':shield: ' + response.data.Username + ' is now verified.');

             client.guilds.get('529631776625131520').members.get(discordid).setNickname(response.data.Username);
           
             client.guilds.get('529631776625131520').members.get(discordid).addRole(client.guilds.get(guild).roles.get('535134591087018001'));
             client.guilds.get('529631776625131520').members.get(discordid).removeRole(client.guilds.get(guild).roles.get('535134616604901378'));
             
             let ref = db.collection('instillinger').doc('bot');

let getDoc = ref.get()
.then(doc => {
if (doc.exists) {

  axios.post("http://" + doc.data().api + ":112/getroles/" + discordid);
}
})
.catch(err => {
console.log('Error getting document', err);
});
             
client.guilds.get('529631776625131520').members.get(discordid).addRole(client.guilds.get(testguild).roles.get('698573570590376056'));
client.guilds.get('529631776625131520').members.get(discordid).removeRole(client.guilds.get(testguild).roles.get('698573605868404747'));

            

  

}

          }).catch(error => {

              console.log(error);

          });

          

        }

    } else

    /*if (args[0] == "unvall") {

      const guild = '529631776625131520';
      const testguild = '697577297326374974';

      message.channel.guild.members.forEach(member => {

        if (member.user.bot) return;

        member.removeRoles(member.roles).then(() => {

          member.addRole(client.guilds.get(guild).roles.get('535134616604901378'));
          //member.addRole(client.guilds.get(testguild).roles.get('698573605868404747'));

        })

      })

  }*/

  if (args[0] == "dmall") {

    client.guilds.get('529631776625131520').roles.get('535134616604901378').members.forEach((member) => {

      member.sendMessage("Moi <@" + member.id + ">! It looks like you haven't verified your account yet with Helsinki Cruises. We're sending out this message to kindly ask you to verify your account using the `!verify` command in the <#535131848821702657> channel **as soon as possible**. We are unable to see any replies to this message, so please contact us through our Discord server if you have any questions. Thank you for your cooperation.");

      console.log("Sent verification warning to: " + member.user.username + " / " + member.id);

    })

}

}
