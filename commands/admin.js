var admin = require('firebase-admin');
var serviceAccount = require("../laatikkonsedo-firebase-adminsdk-4rtn9-2bb94041a9.json");
var db = admin.firestore();

exports.run = (client, message, args) => {

    if (!message.member.hasPermission('ADMINISTRATOR')) {
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
