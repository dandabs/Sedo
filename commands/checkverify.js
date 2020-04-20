const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://3dd1a874b960468685862e533b63c559@o376518.ingest.sentry.io/5197414' });

exports.run = (client, message, args) => {
    
    const reqbodyid = message.author.id;

    let ref1 = db.collection('verification').doc(reqbodyid);

    let getDoc1 = ref1.get()
    .then(doc1 => {
        if (doc1.exists) {

            console.log(doc1.data().roblox);

            var v1 = "";
            var v2 = "";
            var v3 = "";
            var v4 = "";
            var v5 = "";

            if (doc1.data().code.toString()[0] == '1') v1 = "🐶";
            if (doc1.data().code.toString()[0] == '2') v1 = "🐴";
            if (doc1.data().code.toString()[0] == '3') v1 = "🐸";
            if (doc1.data().code.toString()[0] == '4') v1 = "🐡";
            if (doc1.data().code.toString()[0] == '5') v1 = "🐧";
            if (doc1.data().code.toString()[0] == '6') v1 = "🐤";
            if (doc1.data().code.toString()[0] == '7') v1 = "🐳";
            if (doc1.data().code.toString()[0] == '8') v1 = "🐵";
            if (doc1.data().code.toString()[0] == '9') v1 = "🐼";
            if (doc1.data().code.toString()[0] == '0') v1 = "🐲";
            
            
            if (doc1.data().code.toString()[1] == '1') v2 = "🐶";
            if (doc1.data().code.toString()[1] == '2') v2 = "🐴";
            if (doc1.data().code.toString()[1] == '3') v2 = "🐸";
            if (doc1.data().code.toString()[1] == '4') v2 = "🐡";
            if (doc1.data().code.toString()[1] == '5') v2 = "🐧";
            if (doc1.data().code.toString()[1] == '6') v2 = "🐤";
            if (doc1.data().code.toString()[1] == '7') v2 = "🐳";
            if (doc1.data().code.toString()[1] == '8') v2 = "🐵";
            if (doc1.data().code.toString()[1] == '9') v2 = "🐼";
            if (doc1.data().code.toString()[1] == '0') v2 = "🐲";

            
            if (doc1.data().code.toString()[2] == '1') v3 = "🐶";
            if (doc1.data().code.toString()[2] == '2') v3 = "🐴";
            if (doc1.data().code.toString()[2] == '3') v3 = "🐸";
            if (doc1.data().code.toString()[2] == '4') v3 = "🐡";
            if (doc1.data().code.toString()[2] == '5') v3 = "🐧";
            if (doc1.data().code.toString()[2] == '6') v3 = "🐤";
            if (doc1.data().code.toString()[2] == '7') v3 = "🐳";
            if (doc1.data().code.toString()[2] == '8') v3 = "🐵";
            if (doc1.data().code.toString()[2] == '9') v3 = "🐼";
            if (doc1.data().code.toString()[2] == '0') v3 = "🐲";

            
            if (doc1.data().code.toString()[3] == '1') v4 = "🐶";
            if (doc1.data().code.toString()[3] == '2') v4 = "🐴";
            if (doc1.data().code.toString()[3] == '3') v4 = "🐸";
            if (doc1.data().code.toString()[3] == '4') v4 = "🐡";
            if (doc1.data().code.toString()[3] == '5') v4 = "🐧";
            if (doc1.data().code.toString()[3] == '6') v4 = "🐤";
            if (doc1.data().code.toString()[3] == '7') v4 = "🐳";
            if (doc1.data().code.toString()[3] == '8') v4 = "🐵";
            if (doc1.data().code.toString()[3] == '9') v4 = "🐼";
            if (doc1.data().code.toString()[3] == '0') v4 = "🐲";

            
            if (doc1.data().code.toString()[4] == '1') v5 = "🐶";
            if (doc1.data().code.toString()[4] == '2') v5 = "🐴";
            if (doc1.data().code.toString()[4] == '3') v5 = "🐸";
            if (doc1.data().code.toString()[4] == '4') v5 = "🐡";
            if (doc1.data().code.toString()[4] == '5') v5 = "🐧";
            if (doc1.data().code.toString()[4] == '6') v5 = "🐤";
            if (doc1.data().code.toString()[4] == '7') v5 = "🐳";
            if (doc1.data().code.toString()[4] == '8') v5 = "🐵";
            if (doc1.data().code.toString()[4] == '9') v5 = "🐼";
            if (doc1.data().code.toString()[4] == '0') v5 = "🐲";

            const verifcode = v1 + v2 + v3 + v4 + v5;

            request(
                {
                    uri: "https://www.roblox.com/users/" + doc1.data().roblox + "/profile"
                },
                function (error, response, body) {

                    //console.log(body);

                    const desc1 = body.split('<span class="profile-about-content-text linkify" ng-non-bindable>')[1];
                    const stat1 = body.split('data-statustext="')[1];

                    var robloxdesc = "";
                    var robloxstat = "";

                    if (desc1) robloxdesc = he.decode(decodeURI(desc1.split('</span>')[0]));
                    if (stat1) robloxstat = he.decode(decodeURI(stat1.split('"')[0]));

                    console.log(robloxdesc);
                    console.log(robloxstat);

                    if (robloxdesc.includes(verifcode) || body.includes(verifcode)) {

                        var ip = req.header('x-forwarded-for')[0] || req.connection.remoteAddress;

                        res.status(200).send();

                        ref1.delete();

                        const ref3 = db.collection('users');

 let setRef3 = ref3.doc(reqbodyid).set({
    roblox: doc1.data().roblox,
    country: response.data.country,
    city: response.data.city,
    timestamp: Math.floor(new Date() / 1000)
  });

  let ref = db.collection('instillinger').doc('bot');

let getDoc = ref.get()
.then(doc => {
if (doc.exists) {

    request.post('http://' + doc.data().api + ':112/verify/' + reqbodyid, (error, res, body) => {
        if (error) {
          console.error(error)
          return
        }
      });

}
})
.catch(err => {
console.log('Error getting document', err);
});

                        return;


                    } else {

                        return res.status(404).send({
                            message: 'no code'
                         });

                    }

                });

        } else {

            return res.status(400).send({
                message: 'error'
             });

        }

    })
}
