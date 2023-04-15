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