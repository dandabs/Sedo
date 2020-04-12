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

    let ref = db.collection('users').doc(userid);

let getDoc = ref.get()
.then(doc => {
if (doc.exists) {

    axios.get("https://groups.roblox.com/v2/users/" + doc.data().roblox + "/groups/roles")
    .then(response => {

      for (section in response.data.data) {

        if (response.data.data[section].group.id == 4430859) {

          //console.log(response.data.data[section]);

          const user = message.channel.guild.members.get(userid);
          
          user.addRole(message.guild.roles.find("name", response.data.data[section].role.name));

          user.roles.forEach(role => {

            axios.get("https://groups.roblox.com/v1/groups/4430859/roles")
            .then(response2 => {

              for (rank in response2.data.roles) {

                console.log(role.name + " : " + response2.data.roles[rank]);

                if (role.name == response2.data.roles[rank].name) {

                  if (role.name == response.data.data[section].role.name) {

                    console.log(role.name);

                  } else user.removeRole(role.id);

                  

                }

              }
              
            }).catch(error => {
              console.log(error);
          });

            
          })
          
        }

      }

      message.channel.send(":thumbsup: I've assigned the correct role to you from the Helsinki Cruises ROBLOX group.").then(msg => {
  
        msg.delete(5000);
        message.delete(5000)
    
      })

    }).catch(error => {
        console.log(error);
    });

  }
})
.catch(err => {
console.log('Error getting document', err);
});

}