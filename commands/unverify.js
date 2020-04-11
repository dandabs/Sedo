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
