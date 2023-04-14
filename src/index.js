const express = require("express");
const app = express();
var cors = require('cors')

// port infos
const port = process.env.PORT || 8000;

// parser
app.use(express.static("public"));
app.use(express.json());
app.use(cors())


// custom modules
const { checkAuth, hasRole } = require("./middleware/auth")
const { addData, readDoc } = require("./firestoreDB")

app.get("/", checkAuth, (request, response) => {
    response.sendFile(__dirname + "../public/index.html");
});

app.get("/hello", checkAuth, (req, res) => {
    res.send(JSON.stringify({ data: "hello world !" }))
})

app.get("/game", checkAuth, async (req, res) => {

    // check if user exists in db else add
    let isUserInDB = await readDoc(req.userData.email)
    if (isUserInDB == undefined) {
        addUserToDB(req.userData.email)
    }

    let userDBdata = await readDoc(req.userData.email)
    let currentGame = userDBdata["currentGame"]

    res.sendFile(`game-${currentGame}.html`, { root: './public/gamePages' });
})

app.get("/admin", checkAuth, (req, res, next) => {
    let cond = hasRole(req, "admin")
    if (cond) {
        res.send(JSON.stringify({ data: "hello admin !" }))
        return
    }
    res.sendFile('403.html', { root: './public' });
})

app.get('*', (req, res) => {
    res.sendFile('404.html', { root: './public' });
});

// listen for requests :)
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

