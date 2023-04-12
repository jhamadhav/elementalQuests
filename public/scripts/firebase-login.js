import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js'
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
    document.getElementById("submit-login").onclick = async () => {
        await loginUser()
    }
    document.getElementById("submit-logout").onclick = async () => {
        logoutUser()
    }
    document.getElementById("submit-reset-password").onclick = async () => {
        resetPassword()
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // console.log(user);
            appUser.uid = user.uid
            appUser.email = user.email

            user.getIdToken(true).then((idToken) => {
                // console.log("id token retrieved")
                appUser.idToken = idToken
            }).catch((error) => {
                console.log("Error while getting login info")
                console.log(error);
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

const loginUser = async () => {

    let email = document.getElementById("email").value
    let pass = document.getElementById("password").value

    let userCredential = await signInWithEmailAndPassword(auth, email, pass)
    try {
        let user = userCredential.user
        console.log("user logged in");
    } catch (e) {
        console.log("login failed");
        console.log(e);
    }
}

const logoutUser = () => {
    signOut(auth).then(() => {
        appUser = {}
        console.log("logged out");
    }).catch((error) => {
        console.log("error in log out");
        console.log(error);
    });
}

const resetPassword = () => {
    let email = document.getElementById("email").value
    sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log("password reset mail sent")
        })
        .catch((error) => {
            console.log("error while sending password reset mail")
            console.log(error);
        });
}



