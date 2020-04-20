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
            //msg.delete(5000);
            //message.delete();
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
                        .setDescription("You're already in the process of verifying the account `" + doc2.data().username + "`. Check your DMs from me for your verification link, or to cancel the verification process, use !cancelverify."));
        
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

                         const code = ranstr(5, '1234567890');

                         let setRef3 = ref3.doc(message.author.id).set({
                             roblox: response.data.Id + "",
                             username: args[0],
                             verif: token,
                             timestamp: Math.floor(new Date() / 1000),
                             code: code
                           });

                        //message.author.send('To verify your ROBLOX account with Helsinki Cruises, please follow the instructions at this website: <https://helsinkicruises.web.app/verify?token=' + token + '&id=' + message.author.id + '>.');
                        
                        var v1 = "";
                        var v2 = "";
                        var v3 = "";
                        var v4 = "";
                        var v5 = "";
            
                        if (code.toString()[0] == '1') v1 = "🐶";
                        if (code.toString()[0] == '2') v1 = "🐴";
                        if (code.toString()[0] == '3') v1 = "🐸";
                        if (code.toString()[0] == '4') v1 = "🐡";
                        if (code.toString()[0] == '5') v1 = "🐧";
                        if (code.toString()[0] == '6') v1 = "🐤";
                        if (code.toString()[0] == '7') v1 = "🐳";
                        if (code.toString()[0] == '8') v1 = "🐵";
                        if (code.toString()[0] == '9') v1 = "🐼";
                        if (code.toString()[0] == '0') v1 = "🐲";
                        
                        
                        if (code.toString()[1] == '1') v2 = "🐶";
                        if (code.toString()[1] == '2') v2 = "🐴";
                        if (code.toString()[1] == '3') v2 = "🐸";
                        if (code.toString()[1] == '4') v2 = "🐡";
                        if (code.toString()[1] == '5') v2 = "🐧";
                        if (code.toString()[1] == '6') v2 = "🐤";
                        if (code.toString()[1] == '7') v2 = "🐳";
                        if (code.toString()[1] == '8') v2 = "🐵";
                        if (ode.toString()[1] == '9') v2 = "🐼";
                        if (code.toString()[1] == '0') v2 = "🐲";
            
                        
                        if (code.toString()[2] == '1') v3 = "🐶";
                        if (code.toString()[2] == '2') v3 = "🐴";
                        if (code.toString()[2] == '3') v3 = "🐸";
                        if (code.toString()[2] == '4') v3 = "🐡";
                        if (code.toString()[2] == '5') v3 = "🐧";
                        if (code.toString()[2] == '6') v3 = "🐤";
                        if (code.toString()[2] == '7') v3 = "🐳";
                        if (code.toString()[2] == '8') v3 = "🐵";
                        if (code.toString()[2] == '9') v3 = "🐼";
                        if (code.toString()[2] == '0') v3 = "🐲";
            
                        
                        if (code.toString()[3] == '1') v4 = "🐶";
                        if (code.toString()[3] == '2') v4 = "🐴";
                        if (code.toString()[3] == '3') v4 = "🐸";
                        if (code.toString()[3] == '4') v4 = "🐡";
                        if (code.toString()[3] == '5') v4 = "🐧";
                        if (code.toString()[3] == '6') v4 = "🐤";
                        if (code.toString()[3] == '7') v4 = "🐳";
                        if (code.toString()[3] == '8') v4 = "🐵";
                        if (code.toString()[3] == '9') v4 = "🐼";
                        if (code.toString()[3] == '0') v4 = "🐲";
            
                        
                        if (code.toString()[4] == '1') v5 = "🐶";
                        if (code.toString()[4] == '2') v5 = "🐴";
                        if (code.toString()[4] == '3') v5 = "🐸";
                        if (code.toString()[4] == '4') v5 = "🐡";
                        if (code.toString()[4] == '5') v5 = "🐧";
                        if (code.toString()[4] == '6') v5 = "🐤";
                        if (code.toString()[4] == '7') v5 = "🐳";
                        if (code.toString()[4] == '8') v5 = "🐵";
                        if (code.toString()[4] == '9') v5 = "🐼";
                        if (code.toString()[4] == '0') v5 = "🐲";
            
                        const verifcode = v1 + v2 + v3 + v4 + v5;

                        message.author.send('To verify your account, please type the following code in your ROBLOX status or description: `' + verifcode + '`, then type `!checkverify` in <#535131848821702657>.');
                        message.author.send('Alternatively, if you prefer, you can use our classic, traditional GUI verification, by visiting <https://helsinkicruises.web.app/verify?token=' + token + '&id=' + message.author.id + '>.');
                        message.author.send('Thank you for verifying and using our bot! We wish you a pleasant voyage.');

                        message.channel.send(':mailbox_with_mail: I\'ve sent you a DM with information on how to verify your account.')
  .then(msg => {
    //msg.delete(10000)
    //message.delete();
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
