let instructionList = [
    "The purpose of this game set is to evaluate your soft skills",
    "We recommend completing all games in one sitting, as the game is designed to be played only once",
    "Points are awarded for correct answers and time taken to solve each game",
    "The timer will not be visible on screen",
    "In the event of an emergency such as a power outage, technical difficulties, or network issues, you may resume the game from where you left off",
    "Timer will continue on the server but your progress won't be lost",
    "Please be attentive to all information presented in the game",
    "If you find yourself at a dead end, you can choose to review the previous stage, which may provide clues to help you progress past the current stage",
    "If necessary, you have the option to skip a stage, though this will result in forfeiting any potential points for that stage",
    "You may end the game at any time, regardless of what stage you are on and receive results till there"
]

// fill in the general instructions
const fillInstructions = () => {
    let instructionOl = document.getElementById("instruction-ol")
    for (let i = 0; i < instructionList.length; ++i) {
        let li = document.createElement("li")
        li.innerText = instructionList[i]
        instructionOl.appendChild(li)
    }
}

fillInstructions()
