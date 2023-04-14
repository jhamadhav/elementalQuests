window.onload = () => {

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

}

const closePopPage = (div) => {
    div.style.display = "none"
}

const openPopPage = (div) => {
    div.style.display = "flex"
}