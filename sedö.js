const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");

const express = require('express');
const app = express();

const client = new Discord.Client();

var admin = require('firebase-admin');
var serviceAccount = require("./helsinkicruises-firebase-adminsdk-35i3k-deb8a8b7ab.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://helsinkicruises.firebaseio.com"
  });
var db = admin.firestore();

app.post('/verify/:id', (req, res) => {

  const guild = '529631776625131520';
  const testguild = '697577297326374974';

  client.guilds.get(guild).members.get(req.params.id).addRole(client.guilds.get(guild).roles.get('535134591087018001'));
  client.guilds.get(guild).members.get(req.params.id).removeRole(client.guilds.get(guild).roles.get('535134616604901378'));

  client.guilds.get(testguild).members.get(req.params.id).addRole(client.guilds.get(testguild).roles.get('698573570590376056'));
  client.guilds.get(testguild).members.get(req.params.id).removeRole(client.guilds.get(testguild).roles.get('698573605868404747'));

  client.guilds.get(guild).members.get(req.params.id).sendMessage(':wave: Thanks for verifying, and welcome to Helsinki Cruises.');

});

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

let ref = db.collection('instillinger').doc('bot');

let getDoc = ref.get()
.then(doc => {
if (doc.exists) {
    client.login(doc.data().token);
}
})
.catch(err => {
console.log('Error getting document', err);
});

app.listen(112, () =>
  console.log('Ready to serve the world wide web on port 112.'),
);
