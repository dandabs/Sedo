const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://3dd1a874b960468685862e533b63c559@o376518.ingest.sentry.io/5197414' });

var admin = require('firebase-admin');
var serviceAccount = require("../helsinkicruises-firebase-adminsdk-35i3k-deb8a8b7ab.json");
var db = admin.firestore();

const Discord = require('discord.js');

const axios = require('axios');

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

    axios.get("https://api.roblox.com/users/get-by-username?username=" + robloxname)
    .then(response => {



    }).catch(error => {
        console.log(error);
    });

}