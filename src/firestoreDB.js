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
        hasEnded: false,
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
    // hintTaken: false,
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

const updateGameDetail = (gameData, userdata, logic) => {
    let email = userdata["email"]
    let currentGame = userdata["currentGame"]

    userdata["games"][currentGame]["attempts"]++

    let status = logic["status"]

    if (status == 0) {
        writeData(email, userdata)
        console.log(`${email} for game ${currentGame} incorrect attempt increased`)
        return
    }

    // userdata["games"][currentGame]["answer"] = gameData["answer"]

    userdata["games"][currentGame]["endTime"] = Date.now()


    let score = logic["score"]
    userdata["games"][currentGame]["score"] = score

    userdata["totalScore"] += score
    userdata["currentGame"]++

    // add points to skill
    for (let i = 0; i < gameData["skills"].length; ++i) {
        let tempKey = gameData["skills"][i]
        if (userdata["skillScore"].hasOwnProperty(tempKey) == false) {
            userdata["skillScore"][tempKey] = 0
        }
        userdata["skillScore"][tempKey] += score
    }
    writeData(email, userdata)
    console.log(`${email} for game ${currentGame} score updated`)
}

const updateGlobalScore = async (userData) => {
    let globalData = await readGameData("global")
    // console.log(globalData);

    if (Object.keys(globalData).indexOf("finalScore") == -1) {
        globalData["finalScore"] = []
    }
    globalData["finalScore"].push(userData["totalScore"])

    if (Object.keys(globalData).indexOf("finishTime") == -1) {
        globalData["finishTime"] = []
    }
    globalData["finishTime"].push(userData["totalTime"])

    if (Object.keys(globalData).indexOf("skills") == -1) {
        globalData["skills"] = {}
    }

    let skills = Object.keys(userData["skillScore"])
    for (let i = 0; i < skills.length; ++i) {
        skills[i] = skills[i].toString()
        if (Object.keys(globalData["skills"]).indexOf(skills[i]) == -1) {
            globalData["skills"][skills[i]] = []
        }
        globalData["skills"][skills[i]].push(userData["skillScore"][skills[i]])
    }
    // console.log(globalData);

    try {
        db.collection("games").doc("global").set(globalData)
        console.log(`Game ended for: ${userData["email"]}`);
    } catch (e) {
        console.log(`"Error while ending game for: ${userData["email"]}`);
        console.log(e);
    }
}

const func = async () => {
    let res = await readGameData(1)
    console.log(res);
    // let now = Date.now()
    // console.log(now);
}
// func()


module.exports = { readCollection, readDoc, writeData, addUserToDB, readGameData, addGameToDB, updateGameDetail, updateGlobalScore }