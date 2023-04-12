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

    // according to url param show input boxes
    let url = new URL(window.location);
    let val = url.searchParams.get("type")

    let loginInp = document.getElementsByClassName("login-inp")
    let signInp = document.getElementsByClassName("signup-inp")
    let resetInp = document.getElementsByClassName("reset-inp")
    let adminInp = document.getElementsByClassName("admin-inp")

    makeDisplayNone(loginInp)
    makeDisplayNone(signInp)
    makeDisplayNone(resetInp)
    makeDisplayNone(adminInp)

    let temp = loginInp
    if (val == "signup" && appUser == {}) {
        temp = signInp
    } else if (val == "reset" && appUser == {}) {
        temp = resetInp
    }
    if (val == "admin") {
        if (appUser == {}) {
            temp = adminInp
        } else {
            window.location = "/admin"
        }
    }

    for (let i = 0; i < temp.length; ++i) {
        temp[i].style.display = "block"
    }

    document.getElementById("submit-sign-up").onclick = async () => {
        await signUpUser()
    }
    document.getElementById("submit-admin-inp").onclick = async () => {
        await signUpUser()
        window.location = "/admin"
    }
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
                document.cookie = `idToken=${idToken}`;
            }).catch((error) => {
                console.log("Error while getting login info")
                console.log(error);
            })

            // console.log(appUser)
            iziToast.success({ title: "Success", message: "logged in" })
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

    if (userData.email == "") {
        errorMsg("Type in your email !")
        return
    }

    if (userData.pass == "" || userData.confPass == "") {
        errorMsg("Type in your password !")
        return
    }

    if (userData.pass != userData.confPass) {
        console.log("enter same password in both fields");
        errorMsg("Passwords do not match");
        return
    }

    let userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.pass)
    try {
        let user = userCredential.user
        console.log("user signed up");
        console.log(user);

        successMsg("signed up")
    } catch (e) {
        console.log("signup failed");
        console.log(e);

        errorMsg("signup failed");
    }
}

const loginUser = async () => {

    let email = document.getElementById("email").value
    let pass = document.getElementById("password").value
    if (email == "") {
        errorMsg("Type in your email !")
        return
    }
    if (pass == "") {
        errorMsg("Type in your password !")
        return
    }
    let userCredential = await signInWithEmailAndPassword(auth, email, pass)
    try {
        // let user = userCredential.user
        console.log("user logged in");

        // if already logged in move to game
        window.location = "/hello"
    } catch (e) {

        // if already logged in move to game 
        if (appUser != {}) {
            window.location = "/hello"
        }

        console.log("login failed");
        errorMsg("login failed");
        console.log(e);
    }
}

const logoutUser = () => {
    signOut(auth).then(() => {
        document.cookie = "idToken=";
        appUser = {}
        console.log("logged out");

        successMsg("logged out");
    }).catch((error) => {
        console.log("error in log out");
        console.log(error);

        errorMsg("error in log out");
    });
}

const resetPassword = () => {
    let email = document.getElementById("email").value
    if (email == "") {
        errorMsg("Type in your email !")
        return
    }
    sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log("password reset mail sent")

            successMsg.log("password reset mail sent")
        })
        .catch((error) => {
            console.log("error while sending password reset mail")
            console.log(error);

            errorMsg("error while sending password reset mail")
        });
}

const successMsg = (txt) => {
    iziToast.success({ title: "Success", message: txt })
}
const errorMsg = (txt) => {
    iziToast.error({ title: "Error", message: txt })
}

const makeDisplayNone = (elem) => {
    for (let i = 0; i < elem.length; ++i) {
        elem[i].style.display = "none"
    }
}

