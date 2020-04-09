const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");

const client = new Discord.Client();
const config = require("./config.json");

var admin = require('firebase-admin');
var serviceAccount = require("./laatikkonsedo-firebase-adminsdk-4rtn9-2bb94041a9.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://laatikkonsedo.firebaseio.com"
  });
var db = admin.firestore();

// ATTACH THE CONFIGURATION TO THE CLIENT OBJECT SO ITS ACCESSIBLE EVERYWHERE!!!! DONT FORGET THIS DAN GRRRR
client.config = config;

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
