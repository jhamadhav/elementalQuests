const { getAuth } = require('firebase-admin/auth')
const cookie = require('cookie')
const admin = require('firebase-admin')
const serviceAccount = require("./../../elemental-quests-firebase-firebase-adminsdk-zvpd8-ec0c36c9da.json")

const app = admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })

const checkAuth = (req, res, next) => {
    if (req.headers.cookie) {

        let cookieData = cookie.parse(req.headers.cookie)
        let idToken = cookieData["idToken"]
        // console.log(idToken);

        getAuth()
            .verifyIdToken(idToken)
            .then((decodedToken) => {
                const uid = decodedToken.uid;
                // console.log(uid);
                console.log("user is logged in");
                next()
            })
            .catch((error) => {
                res.send(JSON.stringify({ data: "You are not logged in" }))
            });
    } else {
        res.send(JSON.stringify({ data: "You are not logged in" }))
    }
}

module.exports = { checkAuth }
