var admin = require('firebase-admin');
var serviceAccount = require("../helsinkicruises-firebase-adminsdk-35i3k-deb8a8b7ab.json");
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

    } 

}
