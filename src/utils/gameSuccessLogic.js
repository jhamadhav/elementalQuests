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
    timeDiff = Math.floor(desiredTime / (60 * 1000))

    diff = desiredTime - timeDiff

    let score = points + 10 * diff
    score = Math.floor(Math.max(10, score))
    score -= 5 * (userData["games"][currentGame]["attempts"] - 1)

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
    3: dummy,
    4: dummy
}
module.exports = { gameLogic }