import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
   getAuth,
   createUserWithEmailAndPassword,
   onAuthStateChanged,
   signInWithEmailAndPassword,
   signOut,
   sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyCqMd47g0ZX0saJRi_1qlH1few24qg_VRk",
   authDomain: "elemental-quests-firebase.firebaseapp.com",
   projectId: "elemental-quests-firebase",
   storageBucket: "elemental-quests-firebase.appspot.com",
   messagingSenderId: "704041297836",
   appId: "1:704041297836:web:21a4542ef3f2af6d613c09",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
let appUser = null;

window.onload = () => {
   // according to url param show input boxes
   let url = new URL(window.location);
   let val = url.searchParams.get("type");

   let loginInp = document.getElementsByClassName("login-inp");
   let signInp = document.getElementsByClassName("signup-inp");
   let resetInp = document.getElementsByClassName("reset-inp");
   let adminInp = document.getElementsByClassName("admin-inp");

   makeDisplayNone(loginInp);
   makeDisplayNone(signInp);
   makeDisplayNone(resetInp);
   makeDisplayNone(adminInp);

   let temp = loginInp;
   if (val == "signup") {
      temp = signInp;
   } else if (val == "reset") {
      temp = resetInp;
   } else if (val == "admin") {
      temp = adminInp;
   }

   for (let i = 0; i < temp.length; ++i) {
      temp[i].style.display = "flex";
   }

   document.getElementById("submit-sign-up").onclick = async () => {
      showBtnLoader();
      await signUpUser();
   };
   document.getElementById("submit-admin-inp").onclick = async () => {
      showBtnLoader();
      await loginUser();
   };
   document.getElementById("submit-sign-up").onclick = async () => {
      showBtnLoader();
      await signUpUser();
   };
   document.getElementById("submit-login").onclick = async () => {
      showBtnLoader();
      await loginUser();
   };
   document.getElementById("submit-logout").onclick = async () => {
      showBtnLoader();
      logoutUser();
   };
   document.getElementById("submit-reset-password").onclick = async () => {
      showBtnLoader();
      resetPassword();
   };

   onAuthStateChanged(auth, (user) => {
      if (user) {
         // console.log(user);
         appUser = {};
         appUser.uid = user.uid;
         appUser.email = user.email;

         user
            .getIdToken(true)
            .then((idToken) => {
               // console.log("id token retrieved")
               appUser.idToken = idToken;
               // console.log(idToken);
               document.cookie = `idToken=${idToken}`;

               let url = new URL(window.location);
               let val = url.searchParams.get("type");
               if (val == "signup") {
                  iziToast.success({ title: "Redirect", message: "to game" });
                  window.location = "/game";
                  return;
               }
               if (val == "admin") {
                  iziToast.success({
                     title: "Redirect",
                     message: "to dashboard",
                  });
                  window.location = "/admin";
                  return;
               }
               hideLoader();
            })
            .catch((error) => {
               hideLoader();
               console.log("Error while getting login info");
               console.log(error);
            });

         // console.log(appUser)

         successMsg("logged in");
      } else {
         hideLoader();
         appUser = null;
         console.log("user not available");
      }
   });
};

const signUpUser = async () => {
   let userData = {};
   userData.email = document.getElementById("email").value;
   userData.pass = document.getElementById("password").value;
   userData.confPass = document.getElementById("confirm-password").value;
   console.log(userData);

   userData.email = userData.email.trim();
   userData.pass = userData.pass.trim();
   userData.confPass = userData.confPass.trim();
   if (userData.email == "") {
      errorMsg("Type in your email !");
      return;
   }

   if (userData.pass == "" || userData.confPass == "") {
      errorMsg("Type in your password !");
      return;
   }

   if (userData.pass != userData.confPass) {
      console.log("enter same password in both fields");
      errorMsg("Passwords do not match");
      return;
   }

   try {
      let userCredential = await createUserWithEmailAndPassword(
         auth,
         userData.email,
         userData.pass
      );

      let user = await userCredential.user;
      let idToken = user["accessToken"];
      document.cookie = `idToken=${idToken}`;

      successMsg("signed up");
      successMsg("redirecting to game");
      window.location = "/game";

      console.log("user signed up");
      console.log(user);
   } catch (e) {
      console.log("signup failed");
      console.log(e);

      errorMsg("signup failed");
   }
};

const loginUser = async () => {
   let email = document.getElementById("email").value;
   let pass = document.getElementById("password").value;
   if (email == "") {
      errorMsg("Type in your email !");
      return;
   }
   if (pass == "") {
      errorMsg("Type in your password !");
      return;
   }
   email = email.trim();
   pass = pass.trim();
   try {
      let userCredential = await signInWithEmailAndPassword(auth, email, pass);
      let user = userCredential.user;
      // console.log(user);
      let idToken = user["accessToken"];
      document.cookie = `idToken=${idToken}`;

      successMsg("logged in");
      window.location = "/game";

      console.log("user logged in");
   } catch (e) {
      // if already logged in move to game
      if (appUser != null) {
         // console.log("already logged in");
         successMsg("Already logged in");
         successMsg("Redirecting to game");
         window.location = "/dashboard";
         return;
      }

      console.log("login failed");
      errorMsg("login failed");
      console.log(e);
   }
};

const logoutUser = () => {
   signOut(auth)
      .then(() => {
         document.cookie = "idToken=";
         appUser = null;
         console.log("logged out");

         successMsg("logged out");
      })
      .catch((error) => {
         console.log("error in log out");
         console.log(error);

         errorMsg("error in log out");
      });
};

const resetPassword = () => {
   let email = document.getElementById("email").value;
   if (email == "") {
      errorMsg("Type in your email !");
      return;
   }
   sendPasswordResetEmail(auth, email)
      .then(() => {
         console.log("password reset mail sent");

         successMsg("password reset mail sent");
      })
      .catch((error) => {
         console.log("error while sending password reset mail");
         console.log(error);

         errorMsg("error while sending password reset mail");
      });
};

const successMsg = (txt) => {
   hideBtnLoader();
   iziToast.success({ title: "Success", message: txt });
};
const errorMsg = (txt) => {
   hideBtnLoader();
   iziToast.error({ title: "Error", message: txt });
};

const makeDisplayNone = (elem) => {
   for (let i = 0; i < elem.length; ++i) {
      elem[i].style.display = "none";
   }
};

const showBtnLoader = () => {
   let btnLoader = document.getElementsByClassName("btn-loader");
   for (let i = 0; i < btnLoader.length; ++i) {
      btnLoader[i].style.display = "block";
   }

   let btns = document.getElementsByTagName("button");
   for (let i = 0; i < btns.length; ++i) {
      btns[i].style.color = "transparent";
   }
};

const hideBtnLoader = () => {
   let btnLoader = document.getElementsByClassName("btn-loader");
   for (let i = 0; i < btnLoader.length; ++i) {
      btnLoader[i].style.display = "none";
   }

   let btns = document.getElementsByTagName("button");
   for (let i = 0; i < btns.length; ++i) {
      btns[i].style.color = "#fff";
   }
};

const hideLoader = () => {
   let loader = document.getElementsByClassName("loader-container");
   loader[0].style.display = "none";
};
