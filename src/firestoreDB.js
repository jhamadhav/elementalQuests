const { app } = require("./middleware/auth")
const { getFirestore } = require("firebase-admin/firestore")
const db = getFirestore(app);


const readCollection = async () => {
    try {
        let res = db.collection("users")
        res = await res.get()
        // console.log(res);

        let data = []
        res.forEach(doc => {
            data.push(doc.data())
        });
        return data;
    } catch (e) {
        console.log(`Error while retrieving data from firestore via collection`);
        console.log(e);
        return null
    }
}

const readDoc = async (id) => {
    try {
        let res = db.collection("users").doc(id)
        res = await res.get()
        res = await res.data()
        return res
    } catch (e) {
        console.log(`Error while retrieving data from firestore via ID: ${id}`);
        console.log(e);
        return null
    }
}
const readGameData = async (id) => {
    id = id.toString()

    try {
        let res = db.collection("games").doc(id)
        res = await res.get()
        res = await res.data()
        return res
    } catch (e) {
        console.log(`Error while retrieving data from firestore via ID: ${id}`);
        console.log(e);
        return null
    }
}

const writeData = (email, data) => {
    try {
        let res = db.collection("users")
        res = res.doc(email).set(data)
        return res
    } catch (e) {
        console.log(`Error while writing data`);
        console.log(data);
        console.log(e);
        return null
    }
}

const addUserToDB = (email) => {
    let data = {
        email,
        endTime: Date.now(),
        startTime: Date.now(),
        currentGame: 1,
        totalScore: 0,
        games: {},
        skillScore: {}
    }
    try {
        writeData(email, data)
        return true
    } catch (e) {
        console.log(`Error in adding user to DB: ${email}`);
        console.log(e);
        return false
    }
}
let gameTemplate = {
    answer: "null",
    attempts: 0,
    hintTaken: false,
    score: 0,
    startTime: 0,
    endTime: 0
}
const addGameToDB = (data) => {
    let email = data["email"]
    let currentGame = data["currentGame"]

    let newGame = gameTemplate
    newGame["startTime"] = Date.now()
    newGame["endTime"] = Date.now()

    data["games"][currentGame] = newGame
    // console.log(data);
    try {
        writeData(email, data)
        console.log(`game added for: ${email}, game: ${currentGame}`);
    } catch (e) {
        console.log(`error while adding game: ${email}`);
    }
}

const calcScore = (points, desiredTime, timeDiff) => {
    // millisecond to minute
    timeDiff = desiredTime / (60 * 1000)
    diff = desiredTime - timeDiff
    let score = points + 10 * diff
    return Math.floor(Math.max(10, score))
}

const updateGameDetail = (gameData, userdata, status) => {
    let email = userdata["email"]
    let currentGame = userdata["currentGame"]

    userdata["games"][currentGame]["attempts"]++

    if (status == 0) {
        writeData(email, userdata)
        console.log(`${email} for game ${currentGame} incorrect attempt increased`)
        return
    }

    userdata["games"][currentGame]["answer"] = gameData["answer"]

    userdata["games"][currentGame]["endTime"] = Date.now()
    let timeDiff = userdata["games"][currentGame]["endTime"] - userdata["games"][currentGame]["startTime"]

    let score = calcScore(gameData["points"], gameData["desiredFinishTime"], timeDiff)
    score -= 5 * (userdata["games"][currentGame]["attempts"] - 1)

    userdata["games"][currentGame]["score"] = score

    userdata["totalScore"] += score
    userdata["currentGame"]++

    writeData(email, userdata)
    console.log(`${email} for game ${currentGame} data updated`)
}

const func = async () => {
    let res = await readGameData(1)
    console.log(res);
    // let now = Date.now()
    // console.log(now);
}
// func()


module.exports = { readCollection, readDoc, writeData, addUserToDB, readGameData, addGameToDB, updateGameDetail }