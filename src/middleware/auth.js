const admin = require('firebase-admin')
const { getAuth } = require('firebase-admin/auth')

const serviceAccount = require("./../../elemental-quests-firebase-firebase-adminsdk-zvpd8-ec0c36c9da.json")

const cookie = require('cookie')
const { roles } = require("./../roles")

const app = admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })

const checkAuth = (req, res, next) => {
    if (req.headers.cookie) {

        let cookieData = cookie.parse(req.headers.cookie)
        let idToken = cookieData["idToken"]
        // console.log(idToken);

        getAuth()
            .verifyIdToken(idToken)
            .then((decodedToken) => {
                let data = {}
                data.email = decodedToken.email
                data.uid = decodedToken.uid

                req.userData = data
                // console.log("user is logged in");
                // console.log(data);
                next()
            })
            .catch((error) => {
                userUID = null
                res.send(JSON.stringify({ data: "You are not logged in" }))
            });
    } else {
        res.sendFile('403.html', { root: './public' });
        // res.send(JSON.stringify({ data: "You are not logged in" }))
    }
}
const hasRole = (req, role) => {
    let UID = req.userData.uid
    if (UID != undefined && roles[UID] == role) {
        return true
    }
    return false
}
module.exports = { checkAuth, hasRole, app }
