import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCqMd47g0ZX0saJRi_1qlH1few24qg_VRk",
    authDomain: "elemental-quests-firebase.firebaseapp.com",
    projectId: "elemental-quests-firebase",
    storageBucket: "elemental-quests-firebase.appspot.com",
    messagingSenderId: "704041297836",
    appId: "1:704041297836:web:21a4542ef3f2af6d613c09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
let appUser = {}

window.onload = () => {
    document.getElementById("submit-sign-up").onclick = async () => {
        await signUpUser()
    }
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // console.log(user);
            appUser.uid = user.uid
            appUser.email = user.email

            user.getIdToken(true).then((idToken) => {
                console.log("id token retrieved")
                appUser.idToken = idToken
            }).catch((error) => {
                console.log("Error while getting login info");
            })

            console.log(appUser)
        } else {
            console.log("user not available");
        }
    });
}

const signUpUser = async () => {
    let userData = {}
    userData.email = document.getElementById("email").value
    userData.pass = document.getElementById("password").value
    userData.confPass = document.getElementById("confirm-password").value
    console.log(userData);

    if (userData.pass != userData.confPass) {
        console.log("enter same password in both fields");
        return
    }

    let userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.pass)
    try {
        let user = userCredential.user
        console.log("user signed up");
        console.log(user);
    } catch (e) {
        console.log("signup failed");
        console.log(e);
    }
}

export const getUser = () => {
    let user = auth.currentUser;
    console.log(user);
    console.log(user.id_token);
}




