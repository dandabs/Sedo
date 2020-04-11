var mustacheExpress = require('mustache-express');
const functions = require('firebase-functions');
const express = require('express');
const app = express();

const GeoIP = require("simple-geoip");

let geoIP  = new GeoIP("at_XBzyqDU80gEqYOn9D77aYTdcnLz7V");

var request = require("request");

var he = require('he');

var bodyParser = require('body-parser');

var axios = require('axios');

var admin = require('firebase-admin');
var serviceAccount = require("./helsinkicruises-firebase-adminsdk-35i3k-deb8a8b7ab.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://helsinkicruises.firebaseio.com"
  });
var db = admin.firestore();

function ranstr(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

app.engine('mustache', mustacheExpress());
 
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.set('trust proxy', true);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
  })); 

app.post('/verify', (req, res) => {

    if (!req.body.id) {

        return res.status(401).send({
            message: 'no id'
         });

    }

    let ref1 = db.collection('verification').doc(req.body.id);

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

                    const robloxdesc = he.decode(decodeURI(body.split('<span class="profile-about-content-text linkify" ng-non-bindable>')[1].split('</span>')[0]));

                    console.log(robloxdesc);

                    if (robloxdesc.includes(verifcode)) {

                        var ip = req.header('x-forwarded-for')[0] || req.connection.remoteAddress;

                        res.status(200).send();

                        ref1.delete();

                        const ref3 = db.collection('users');
                        console.log('ip is ' + req.ip);
                                                axios.get("https://www.iplocate.io/api/lookup/" + req.ip)
                                                
                        .then(response => {

 let setRef3 = ref3.doc(req.body.id).set({
    roblox: doc1.data().roblox,
    country: response.data.country,
    city: response.data.city,
    timestamp: Math.floor(new Date() / 1000)
  });

  let ref = db.collection('instillinger').doc('bot');

let getDoc = ref.get()
.then(doc => {
if (doc.exists) {

    request.post('http://' + doc.data().api + ':112/verify/' + req.body.id, (error, res, body) => {
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

});

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

});

app.get('/verify', (req, res) => {

    if (!req.query.id || !req.query.token) {

        res.redirect('https://helsinkicruises.web.app/');
        return;

    }

    let ref1 = db.collection('verification').doc(req.query.id);

    let getDoc1 = ref1.get()
    .then(doc1 => {
        if (doc1.exists) {

            if (!doc1.data().token == req.query.token) {

                res.redirect('https://helsinkicruises.web.app/'); 
                return;

            }

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

            res.render('verify', {"robloxname": doc1.data().username, "verifycode": v1 + v2 + v3 + v4 + v5})

        } else {

            res.redirect('https://helsinkicruises.web.app/');

        }

    }).catch(error => {

        console.log(error);

        res.redirect('https://helsinkicruises.web.app/');

    });

  });

exports.app = functions.https.onRequest(app);