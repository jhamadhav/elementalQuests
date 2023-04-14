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
const addGameToDB = (email, data) => {

}

const func = async () => {
    let res = await readGameData(1)
    console.log(res);
    // let now = Date.now()
    // console.log(now);
}
// func()

module.exports = { readCollection, readDoc, writeData, addUserToDB, readGameData }