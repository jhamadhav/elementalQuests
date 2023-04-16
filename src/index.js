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
const { readDoc, addUserToDB, readGameData, addGameToDB, updateGameDetail, updateGlobalScore, readCollection } = require("./firestoreDB")
const { gameLogic } = require("./utils/gameSuccessLogic")

app.get("/", checkAuth, (request, response) => {
    response.sendFile(__dirname + "../public/index.html");
});


app.get("/game", checkAuth, async (req, res) => {

    // check if user exists in db else add
    let isUserInDB = await readDoc(req.userData.email)
    if (isUserInDB == undefined) {
        addUserToDB(req.userData.email)
    }

    // get current game
    let userDBdata = await readDoc(req.userData.email)
    let currentGame = 1
    try {
        currentGame = userDBdata["currentGame"]
    } catch (e) {
        console.log("Error while accessing current game");
        console.log(e);
        res.redirect("/")
    }

    // if game has ended move to result area
    if (userDBdata["hasEnded"] == true || currentGame > 5) {
        res.sendFile('result.html', { root: './public/gamePages' });
        return
    }

    // if game data is not added to user data, add that
    let len = Object.keys(userDBdata["games"]).length
    if (len != currentGame) {
        addGameToDB(userDBdata)
    }

    // send user th appropriate page 
    res.sendFile(`game-${currentGame}.html`, { root: './public/gamePages' });
})

// TODO: add check auth middleware
// checkAuth
app.get("/admin", checkAuth, async (req, res) => {
    let cond = hasRole(req, "admin")
    if (cond) {
        res.sendFile('admin.html', { root: './public/gamePages' });
        return
    }

    res.sendFile('403.html', { root: './public' });
})

app.post("/admin", checkAuth, async (req, res) => {
    let cond = hasRole(req, "admin")
    if (cond) {
        let allUserData = await readCollection()
        let globalData = await readGameData("global")
        let maxData = await readGameData("max-total")

        res.send(JSON.stringify({ allUserData, globalData, maxData }))
        return
    }

    res.status(403)
    res.send(JSON.stringify({ error: 403 }))
})

app.post("/checkAnswer", checkAuth, async (req, res) => {
    let data = req.body
    // console.log(data);

    // get user answer
    let userAnswer = data["answer"]

    // get complete user data
    let userDBdata = await readDoc(req.userData.email)
    let currentGame = userDBdata["currentGame"]
    // console.log(currentGame)

    // for last stage
    if (currentGame == 5) {
        // game has ended now update those data
        userDBdata["hasEnded"] = true
        userDBdata["endTime"] = Date.now()

        // calculate total time and update DB
        let finishTime = userDBdata["endTime"] - userDBdata["startTime"]
        finishTime = Math.ceil(finishTime / (60 * 1000))

        userDBdata["totalTime"] = finishTime
    }

    // update current game answer
    userDBdata["games"][currentGame]["answer"] = userAnswer.toString()

    // read gameData from DB for current game
    let gameData = await readGameData(currentGame)
    // console.log(gameData);

    // calculate score and status from game logic
    let logic = gameLogic[currentGame](gameData, userDBdata, userAnswer)

    // console.log(logic);
    if (logic["status"] == 1) {

        // if correct answer update score
        updateGameDetail(gameData, userDBdata, logic)

        // for last stage
        if (currentGame == 5) {
            // add user data to global record
            updateGlobalScore(userDBdata)
        }

        res.send(JSON.stringify({ status: 1, msg: "correct" }))
        return
    }

    // if incorrect answer increment attempt
    updateGameDetail(gameData, userDBdata, logic)
    res.send(JSON.stringify({ status: 0, msg: "incorrect" }))

})

app.post("/skipGame", checkAuth, async (req, res) => {

    // get user data from db
    let userDBdata = await readDoc(req.userData.email)
    let currentGame = userDBdata["currentGame"]
    // console.log(currentGame)

    //get current game data from db
    let gameData = await readGameData(currentGame)
    // console.log(gameData);

    // since user skipped the level, pass the level with score 0
    let logic = {
        status: 1,
        score: 0
    }

    // update game detial in user DB
    updateGameDetail(gameData, userDBdata, logic)

    res.send(JSON.stringify({ status: 1, msg: "correct" }))

})

app.post("/endGame", checkAuth, async (req, res) => {

    // get user data from DB
    let userDBdata = await readDoc(req.userData.email)
    let currentGame = userDBdata["currentGame"]
    // console.log(currentGame)

    // game has ended now update those data
    userDBdata["hasEnded"] = true
    userDBdata["endTime"] = Date.now()

    // calculate total time and update DB
    let finishTime = userDBdata["endTime"] - userDBdata["startTime"]
    finishTime = Math.ceil(finishTime / (60 * 1000))

    userDBdata["totalTime"] = finishTime

    let gameData = await readGameData(currentGame)
    // console.log(gameData);

    // since game has been forcefully ended treat current game as skip
    let logic = {
        status: 1,
        score: 0
    }

    // update user DB
    updateGameDetail(gameData, userDBdata, logic)

    // add user data to global record
    updateGlobalScore(userDBdata)

    res.send(JSON.stringify({ status: 1, msg: "correct" }))
})

app.get("/dead-end-look-up", checkAuth, async (req, res) => {
    let userDBdata = await readDoc(req.userData.email)
    let currentGame = userDBdata["currentGame"]

    let gameReq = req.query.game
    if (gameReq < currentGame && gameReq > 0 && userDBdata["hasEnded"] == false) {
        // send user th appropriate page 
        res.sendFile(`game-${gameReq}.html`, { root: './public/gamePages' });
        return
    }
    // send user th appropriate page 
    res.redirect("/game")

})

app.get("/result", checkAuth, async (req, res) => {
    let userData = await readDoc(req.userData.email)
    let globalData = await readGameData("global")
    let maxData = await readGameData("max-total")

    res.send(JSON.stringify({ userData, globalData, maxData }))
})

app.post("/leaderboard", checkAuth, async (req, res) => {
    let allUserData = await readCollection()
    // for each user extract their email, totalScore and totalTime
    let data = []
    for (let i = 0; i < allUserData.length; ++i) {
        if (allUserData[i]["hasEnded"] == false) continue
        // console.log(allUserData[i]);

        let email = allUserData[i]["email"].split("@")[0]
        let totalScore = allUserData[i]["totalScore"]
        let totalTime = allUserData[i]["totalTime"]
        data.push([totalScore, totalTime, email])
    }
    // console.log(data);
    // return data

    res.send(JSON.stringify({ data }))
})

app.get("/leaderboard", checkAuth, async (req, res) => {

    res.sendFile("leaderboard.html", { root: './public/gamePages' });
})

app.get('*', (req, res) => {
    res.sendFile('404.html', { root: './public' });
});

// listen for requests :)
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))