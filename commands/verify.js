const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://3dd1a874b960468685862e533b63c559@o376518.ingest.sentry.io/5197414' });

var admin = require('firebase-admin');
var serviceAccount = require("../helsinkicruises-firebase-adminsdk-35i3k-deb8a8b7ab.json");
var db = admin.firestore();

const axios = require('axios');

const Discord = require('discord.js');

function ranstr(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

exports.run = (client, message, args) => {

    if (!args[0] || args[1]) {

        message.channel.send(":warning: Please include your ROBLOX username in the verify command. For example, `!verify USERNAME`.")
        
        .then(msg => {
            msg.delete(5000);
            message.delete();
          });

        return;

    }
    
    let ref1 = db.collection('users').doc(message.author.id);

    var robloxname = "";

    robloxname = args[0];

    let getDoc1 = ref1.get()
        .then(doc1 => {
            if (doc1.exists) {

                message.channel.send(new Discord.RichEmbed()
                .setTitle("Error!")
                .setColor("#ff0000")
                .setDescription("You are already verified on Helsinki Cruises. To verify with a different account, use !unverify."));

            } else {

                let ref2 = db.collection('verification').doc(message.author.id);

                let getDoc2 = ref2.get()
                .then(doc2 => {
                    if (doc2.exists) {
        
                        message.channel.send(new Discord.RichEmbed()
                        .setTitle("Error!")
                        .setColor("#ff0000")
                        .setDescription("You're already in the process of verifying the account `" + doc2.data().username + "`. To cancel the verification process, use !cancelverify."));
        
                    } else {

                        axios.get("https://api.roblox.com/users/get-by-username?username=" + robloxname)
                        .then(response => {

                            if (response.data.success == 'false') {

                                message.channel.send(new Discord.RichEmbed()
                                .setTitle("Error!")
                                .setColor("#ff0000")
                                .setDescription("That doesn't look like a valid ROBLOX username."));

                            } else {

                         const robloxid = response.data.Id + "";

                         const ref3 = db.collection('verification');

                         const token = ranstr(10, '1234567890abcdefghijklmnopqrstuvwxyz');

                         let setRef3 = ref3.doc(message.author.id).set({
                             roblox: response.data.Id + "",
                             username: args[0],
                             verif: token,
                             timestamp: Math.floor(new Date() / 1000),
                             code: ranstr(5, '1234567890')
                           });

                        message.author.send('To verify your ROBLOX account with Helsinki Cruises, please follow the instructions at this website: <https://helsinkicruises.web.app/verify?token=' + token + '&id=' + message.author.id + '>.');
                        
                        message.channel.send(':mailbox_with_mail: I\'ve sent you a DM with information on how to verify your account.')
  .then(msg => {
    msg.delete(10000)
    message.delete();
  });

}

                        }).catch(error => {
                            message.channel.send(new Discord.RichEmbed()
                            .setTitle("Error!")
                            .setColor("#ff0000")
                            .setDescription("That doesn't look like a valid ROBLOX username."));
                        });

                    }

                    })
                    .catch(err => {
                        console.log('Error getting document', err);
                    });

                ranstr(10, '1234567890abcdefghijklmnopqrstuvwxyz');

            }
        })
        .catch(err => {
            console.log('Error getting document', err);
        });

}
