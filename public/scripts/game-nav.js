// pop pages
let instructionsDiv = document.getElementById("instructions")
let storyDiv = document.getElementById("story")

// btn to close pop page
let instructionsCloseBtn = document.getElementById("instructions-btn")
instructionsCloseBtn.onclick = () => {
    closePopPage(instructionsDiv)
}

let storyCloseBtn = document.getElementById("story-btn")
storyCloseBtn.onclick = () => {
    closePopPage(storyDiv)
}

// nav buttons to open pop pages
document.getElementById("story-nav").onclick = () => {
    openPopPage(storyDiv)
}

document.getElementById("instructions-nav").onclick = () => {
    openPopPage(instructionsDiv)
}


const closePopPage = (div) => {
    div.style.display = "none"
}

const openPopPage = (div) => {
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
