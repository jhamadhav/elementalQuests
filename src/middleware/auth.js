const { getAuth } = require('firebase-admin/auth')
const cookie = require('cookie')
const admin = require('firebase-admin')
const serviceAccount = require("./../../elemental-quests-firebase-firebase-adminsdk-zvpd8-ec0c36c9da.json")
const { roles } = require("./../roles")

const app = admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })

let userUID = null
const checkAuth = (req, res, next) => {
    if (req.headers.cookie) {

        let cookieData = cookie.parse(req.headers.cookie)
        let idToken = cookieData["idToken"]
        // console.log(idToken);

        getAuth()
            .verifyIdToken(idToken)
            .then((decodedToken) => {
                userUID = decodedToken.uid;
                // console.log(userUID);
                console.log("user is logged in");
                next()
            })
            .catch((error) => {
                userUID = null
                res.send(JSON.stringify({ data: "You are not logged in" }))
            });
    } else {
        res.send(JSON.stringify({ data: "You are not logged in" }))
    }
}
const hasRole = (req, res, next, role) => {
    if (userUID != null && roles[userUID] == role) {
        next()
    } else {
        userUID = null
        res.send(JSON.stringify({ data: "You do not have required authorization" }))
    }
}
module.exports = { checkAuth, hasRole }
