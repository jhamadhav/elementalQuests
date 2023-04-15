
let url = new URL(window.location);
let val = url.searchParams.get("page")

if (val == "deadend") {
    // console.log("deadend");
    let retBtn = document.getElementById("return-to-game")
    retBtn.style.display = "flex"

    let otherBtn = document.getElementsByClassName("ans-holder")
    for (let i = 0; i < otherBtn.length; ++i) {
        otherBtn[i].style.display = "none"
    }


    retBtn.onclick = () => {
        successMsg("Moving to game area")
        window.location = "/game"
        return
    }

    // if on game 4 hide game window as well
    try {
        document.getElementById("game-screen").style.display = "none"
    } catch (e) {
        console.log("game window not here");
    }
}


// pop pages
let instructionsDiv = document.getElementById("instructions")
let storyDiv = document.getElementById("story")

// btn to close pop page
let instructionsCloseBtn = document.getElementById("instructions-btn")
instructionsCloseBtn.onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closePopPage(instructionsDiv)
}

let storyCloseBtn = document.getElementById("story-btn")
storyCloseBtn.onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closePopPage(storyDiv)
}

// nav buttons to open pop pages
document.getElementById("story-nav").onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    openPopPage(storyDiv)
}

document.getElementById("instructions-nav").onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    openPopPage(instructionsDiv)
}

// skip this game
document.getElementById("skip-btn").onclick = async () => {
    showBtnLoader()
    let ans = prompt("You won't gain any points in this game, type Y to skip ?")
    // console.log(ans);

    ans = ans.trim()
    ans = ans.toLocaleLowerCase()
    if (ans != "y") {
        successMsg("Not Skipped")
        return
    }
    // console.log(data);
    let res = await postData("/skipGame", {})
    // console.log(res);

    if (res["status"] == 1) {
        successMsg("accepted")
        successMsg("redirecting to next game")
        window.location = "/game"
    } else {
        errorMsg("incorrect")
    }
    successMsg("Skipped this game")
    successMsg("Moving to next game")
}

// end test
document.getElementById("end-test-btn").onclick = async () => {
    showBtnLoader()
    let ans = prompt("Are you sure want to end the test ? Type Y to End now.")
    // console.log(ans);

    ans = ans.trim()
    ans = ans.toLocaleLowerCase()
    if (ans != "y") {
        successMsg("Not ended")
        return
    }
    // console.log(data);
    let res = await postData("/endGame", {})
    // console.log(res);

    if (res["status"] == 1) {
        successMsg("accepted")
        successMsg("redirecting to score")
        window.location = "/game"
        return
    } else {
        errorMsg("incorrect")
    }
    successMsg("Skipped this game")
    successMsg("Moving to next game")
}


const closePopPage = (div) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    div.style.display = "none"
}

const openPopPage = (div) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    div.style.display = "flex"
}

// basic needed functions
const successMsg = (txt) => {
    hideBtnLoader()
    iziToast.success({ title: "Success", message: txt })
}
const errorMsg = (txt) => {
    hideBtnLoader()
    iziToast.error({ title: "Error", message: txt })
}

const showBtnLoader = () => {
    let btnLoader = document.getElementsByClassName("btn-loader")
    for (let i = 0; i < btnLoader.length; ++i) {
        btnLoader[i].style.display = "block"
    }

    let btns = document.getElementsByClassName("sub-btn")
    for (let i = 0; i < btns.length; ++i) {
        btns[i].style.color = "transparent"
    }
}

const hideBtnLoader = () => {
    let btnLoader = document.getElementsByClassName("btn-loader")
    for (let i = 0; i < btnLoader.length; ++i) {
        btnLoader[i].style.display = "none"
    }

    let btns = document.getElementsByClassName("sub-btn")
    for (let i = 0; i < btns.length; ++i) {
        btns[i].style.color = "#fff"
    }
}

const hideLoader = () => {
    let loader = document.getElementsByClassName("loader-container")
    loader[0].style.display = "none"
}

const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
    });
    return response.json();
}