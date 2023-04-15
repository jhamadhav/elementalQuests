import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, signOut } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js'

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

window.onload = () => {
    hideLoader()
    document.getElementById("submit-logout").onclick = async () => {
        logoutUser()
    }
}

const logoutUser = () => {
    signOut(auth).then(() => {
        document.cookie = "idToken=";
        console.log("logged out");

        successMsg("logged out");
        window.location = "/"
    }).catch((error) => {
        console.log("error in log out");
        console.log(error);

        errorMsg("error in log out");
    });
}

const successMsg = (txt) => {
    iziToast.success({ title: "Success", message: txt })
}
const errorMsg = (txt) => {
    iziToast.error({ title: "Error", message: txt })
}

const hideLoader = () => {
    let loader = document.getElementsByClassName("loader-container")
    loader[0].style.display = "none"
}