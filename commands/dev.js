var admin = require('firebase-admin');
var serviceAccount = require("../helsinkicruises-firebase-adminsdk-35i3k-deb8a8b7ab.json");
var db = admin.firestore();

exports.run = (client, message, args) => {

    if (!message.author.id == '638421107711410218') {
        return;
    }

    if (args[0] == "refresh") {

        if(!args || args.length < 2) return message.reply("Must provide a command name to reload.");
        const commandName = args[1];
        // Check if the command exists and is valid
        if(!client.commands.has(commandName)) {
          return message.channel.send("That command does not exist");
        }
        // the path is relative to the *current folder*, so just ./filename.js
        delete require.cache[require.resolve(`./${commandName}.js`)];
        // We also need to delete and reload the command from the client.commands Enmap
        client.commands.delete(commandName);
        const props = require(`./${commandName}.js`);
        client.commands.set(commandName, props);
        message.channel.send(`The command ${commandName} has been reloaded.`);

    }

}
