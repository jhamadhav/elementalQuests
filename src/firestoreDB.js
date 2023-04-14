const admin = require('firebase-admin')
const serviceAccount = require("./../elemental-quests-firebase-firebase-adminsdk-zvpd8-ec0c36c9da.json")

const { getFirestore } = require("firebase-admin/firestore")


const app = admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
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

const writeData = (id) => {
    try {
        let res = db.collection("users")
        res = res.doc(id).set({ "name": "again mj" })
        return res
    } catch (e) {
        console.log(`Error while writing data`);
        console.log(data);
        console.log(e);
        return null
    }

}
const func = async () => {
    let res = await readDoc("jhamadhav28@gmail.com")
    console.log(res);
}
// func()

module.exports = { readCollection, readDoc, writeData }