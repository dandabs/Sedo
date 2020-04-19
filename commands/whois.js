const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://3dd1a874b960468685862e533b63c559@o376518.ingest.sentry.io/5197414' });

const axios = require('axios');

const Discord = require('discord.js');

var admin = require('firebase-admin');
var serviceAccount = require("../helsinkicruises-firebase-adminsdk-35i3k-deb8a8b7ab.json");
var db = admin.firestore();

var util = require("util"),
    https = require("https");

var he = require('he');

exports.run = (client, message, args) => {

    if (!message.mentions.members.first() && !args[0]) {

        message.channel.send(new Discord.RichEmbed()
        .setTitle("Error!")
        .setColor("#ff0000")
        .setDescription("Please mention a user."));

        return;

    }

    var discordid = "";

    if (!message.mentions.members.first()) discordid = args[0];
    if (message.mentions.members.first()) discordid = message.mentions.members.first().id;

    message.channel.send(":hourglass_flowing_sand: Fetching info for <@" + discordid + ">").then((msg => {

        let ref = db.collection('users').doc(discordid);

        let getDoc = ref.get()
            .then(doc => {
                if (doc.exists) {

                    const robloxid = doc.data().roblox;

                    /*
            
                            axios.get("https://thumbnails.roblox.com/v1/users/avatar-headshot?format=Png&isCircular=false&size=150x150&userIds=" + robloxid)
                    .then(response => {
                  
                      const imageUrl = response.data.data[0].imageUrl
                      message.channel.send(imageUrl);
                  
                    })
                    .catch(error => {
                      console.log(error);
                    });
                    
                    */

                    axios.get("https://thumbnails.roblox.com/v1/users/avatar-headshot?format=Png&isCircular=false&size=150x150&userIds=" + robloxid)
                        .then(response => {

                            const imageUrl = response.data.data[0].imageUrl;

                            axios.get("https://api.roblox.com/users/" + robloxid)
                                .then(response => {

                                    const robloxname = response.data.Username;

                                    //const robloxstatus = response.data.IsOnline;

                                    axios.get("https://api.roblox.com/users/" + robloxid + "/friends")
                                        .then(response => {

                                            const robloxfriends = response.data.length;

                                            axios.get("https://badges.roblox.com/v1/users/" + robloxid + "/badges?limit=100")
                                                .then(response => {

                                                    const robloxbadges = response.data.data.length;

                                                    

                                                    var request = require("request");

                                                    request(
                                                        {
                                                            uri: "https://premiumfeatures.roblox.com/v1/users/" + robloxid + "/validate-membership",
                                                            headers: {
                                                                'Cookie': '.ROBLOSECURITY=_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_095361F0B9F4AEAA9CD947B2313C20169AE27285294B2A756F4B1E88258CB796AEE5CC1754E1F7B9C6D9E4B063C1E450B27FD5E8A41E443C26B5AD841F5F76DDCD4BD480F24F8448A0D309A4D94E8F8E2A4F13FF73E8D34E9E2373CB36A7EC3A0B96261019FCD1AEAA8A4762DFEF5E89FFCF40D56F7F758967380C672F935CE9E6F641D661B152999E07A55447CA99DB1BC147676E42373018FD4F65B5906324621AE71F99415D4CB092AA3EAD817475D051D872C3505A59C95B3840E8F672F90CCDC0F4CE034B833023DD5CB6CA1BDEAE13675F61CB19D35B06443A6556BADF7C90F3840BECCBA4D6DE92349B81540B790BC93690D4F80CA61F955B000B18ECF0C346B523D25A9A515A6385C03C001F3A9F8160DBBCF03BBFD52D814B404830912D6E0F; .RBXID=_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJkMTI1ZTJkNi0wNzViLTQ2MGEtYmYxZS0xODE2MDI0OTFlMWEiLCJzdWIiOjUwMzQwMTM4fQ.9-BPK93TUNFtCRFLNObBT6VlGsrYwCqq_8OTt2SaaeA;'
                                                            }
                                                        },
                                                        function (error, response, body) {

                                                            const robloxpremium = body;

                                                            request(
                                                                {
                                                                    uri: "https://www.roblox.com/users/" + robloxid + "/profile"
                                                                },
                                                                function (error, response, body) {

                                                                    var robloxdesc = "";

                                                                    const temp1 = body.split('<span class="profile-about-content-text linkify" ng-non-bindable>')[1];

                                                                    if (!temp1) { robloxdesc = "No descripion." } else {

                                                                        robloxdesc = he.decode(decodeURI(temp1.split('</span>')[0]));

                                                                    }
                                                                    const robloxdate = body.split('Join Date<p class=text-lead>')[1].split('<')[0];

                                                                    axios.get("https://groups.roblox.com/v2/users/" + robloxid + "/groups/roles")
                                                                       .then(response => {

                                                                        const robloxgroups = response.data.data.length;
                                                                        const hcrank = "";

                                                                            axios.post("https://presence.roblox.com/v1/presence/users", {
                                                                                userIds: [robloxid]
                                                                            }, { headers: {
                                                                                    'Cookie': '.ROBLOSECURITY=_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_095361F0B9F4AEAA9CD947B2313C20169AE27285294B2A756F4B1E88258CB796AEE5CC1754E1F7B9C6D9E4B063C1E450B27FD5E8A41E443C26B5AD841F5F76DDCD4BD480F24F8448A0D309A4D94E8F8E2A4F13FF73E8D34E9E2373CB36A7EC3A0B96261019FCD1AEAA8A4762DFEF5E89FFCF40D56F7F758967380C672F935CE9E6F641D661B152999E07A55447CA99DB1BC147676E42373018FD4F65B5906324621AE71F99415D4CB092AA3EAD817475D051D872C3505A59C95B3840E8F672F90CCDC0F4CE034B833023DD5CB6CA1BDEAE13675F61CB19D35B06443A6556BADF7C90F3840BECCBA4D6DE92349B81540B790BC93690D4F80CA61F955B000B18ECF0C346B523D25A9A515A6385C03C001F3A9F8160DBBCF03BBFD52D814B404830912D6E0F; .RBXID=_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJkMTI1ZTJkNi0wNzViLTQ2MGEtYmYxZS0xODE2MDI0OTFlMWEiLCJzdWIiOjUwMzQwMTM4fQ.9-BPK93TUNFtCRFLNObBT6VlGsrYwCqq_8OTt2SaaeA;'
                                                                            }})
                                                                            .then(response => {

                                                                                var robloxstatus = "";
                                                                                if (response.data.userPresences[0].userPresenceType == 0) robloxstatus = "false";
                                                                                if (!response.data.userPresences[0].userPresenceType == 0) robloxstatus = "true";

                                                                                const embed = new Discord.RichEmbed()
                                                                                .setColor('#00008b')
                                                                                .setTitle("Profile")
                                                                                .setURL('https://www.roblox.com/users/' + robloxid + '/profile')
                                                                                .setAuthor(robloxname, imageUrl)
                                                                                .setDescription(robloxdesc)
                                                                                .setThumbnail(imageUrl)
                                                                                .addField('Roblox ID', robloxid, true)
                                                                                .addField('Roblox Join Date', robloxdate.split('/')[1] + '/' + robloxdate.split('/')[0] + '/' + robloxdate.split('/')[2], true)
                                                                                .addField('Discord Join Date', client.users.get(discordid).createdAt.getDate() + "/" + client.users.get(discordid).createdAt.getMonth() + "/" + client.users.get(discordid).createdAt.getFullYear(), true)
                                                                                .addField('Friends', robloxfriends, true)
                                                                                .addField('Badges', robloxbadges, true)
                                                                                .addField('Groups', robloxgroups, true)
                                                                                .addField('Premium?', robloxpremium, true)
                                                                                .addField('Online?', robloxstatus, true)

                                                                            message.channel.send(embed);
                                                                            msg.delete();

                                                                            



                                                                        })
                                                                        .catch(error => {
                                                                            message.channel.send(new Discord.RichEmbed()
                                                                            .setTitle("Error!")
                                                                            .setColor("#ff0000")
                                                                            .setDescription("An error has occurred. Are you sure the user exists and is verified? 6"));
                                                                        });

                                                                    }
                                                                    
                                                            );

                                                        })
                                                        })

                                                })
                                                .catch(error => {
                                                    message.channel.send(new Discord.RichEmbed()
                                                    .setTitle("Error!")
                                                    .setColor("#ff0000")
                                                    .setDescription("An error has occurred. Are you sure the user exists and is verified? 5"));
                                                });

                                        })
                                        .catch(error => {
                                            message.channel.send(new Discord.RichEmbed()
                                            .setTitle("Error!")
                                            .setColor("#ff0000")
                                            .setDescription("An error has occurred. Are you sure the user exists and is verified? 4"));
                                        });

                                })
                                .catch(error => {
                                    message.channel.send(new Discord.RichEmbed()
                                    .setTitle("Error!")
                                    .setColor("#ff0000")
                                    .setDescription("An error has occurred. Are you sure the user exists and is verified? 3"));
                                });

                        })
                        .catch(error => {
                            message.channel.send(new Discord.RichEmbed()
                            .setTitle("Error!")
                            .setColor("#ff0000")
                            .setDescription("An error has occurred. Are you sure the user exists and is verified? 2"));
                        });

                } else {

                    message.channel.send(new Discord.RichEmbed()
                    .setTitle("Error!")
                    .setColor("#ff0000")
                    .setDescription("An error has occurred. Are you sure the user exists and is verified? 1"));
  

                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });

    }));

}
