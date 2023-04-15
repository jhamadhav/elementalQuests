const gameOneTwo = (gameData, userData, userAnswer) => {
    userAnswer = userAnswer.toLowerCase()
    if (gameData["answer"].toLowerCase() != userAnswer) {
        return {
            status: 0,
            score: 0
        }
    }

    let currentGame = userData["currentGame"]

    let timeDiff = userData["games"][currentGame]["endTime"] - userData["games"][currentGame]["startTime"]

    let points = gameData["points"], desiredTime = gameData["desiredFinishTime"]

    // millisecond to minute
    timeDiff = Math.floor(timeDiff / (60 * 1000))

    diff = desiredTime - timeDiff

    let score = points + 10 * diff
    score = Math.floor(Math.max(10, score))
    score -= 5 * (userData["games"][currentGame]["attempts"] - 1)

    return {
        status: 1,
        score
    }
}
const gameThree = (gameData, userData) => {

    let currentGame = userData["currentGame"]

    let timeDiff = userData["games"][currentGame]["endTime"] - userData["games"][currentGame]["startTime"]

    let points = gameData["points"], desiredTime = gameData["desiredFinishTime"]
    // millisecond to minute
    timeDiff = Math.floor(timeDiff / (60 * 1000))

    let diff = desiredTime - timeDiff

    let score = points - 10 * diff
    score = Math.floor(Math.max(10, score))

    return {
        status: 1,
        score
    }
}


const gameFour = (gameData, userData, userAnswer) => {
    let failData = {
        status: 0,
        score: 0
    }

    if (userAnswer.length < 2) return failData

    let iron = userAnswer[0]
    let copper = userAnswer[1]

    if (iron > 100 || copper > 50) return failData

    // console.log(gameData["points"]);
    let score = gameData["points"] - Math.abs(100 - iron) - Math.abs(50 - copper)

    let currentGame = userData["currentGame"]
    score -= 5 * (userData["games"][currentGame]["attempts"] - 1)
    // console.log(score);

    return {
        status: 1,
        score
    }
}


const dummy = (gameData, userData, userAnswer) => {
    return {
        status: 0,
        score: 0
    }
}

const gameLogic = {
    1: gameOneTwo,
    2: gameOneTwo,
    3: gameThree,
    4: gameFour
}

module.exports = { gameLogic }