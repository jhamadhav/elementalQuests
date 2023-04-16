const gameOneTwo = (gameData, userData, userAnswer) => {
    userAnswer = userAnswer.toLowerCase()
    if (gameData["answer"].toLowerCase() != userAnswer) {
        return {
            status: 0,
            score: 0
        }
    }

    let currentGame = userData["currentGame"]

    let timeDiff = Date.now() - userData["games"][currentGame]["startTime"]

    let points = gameData["points"], desiredTime = gameData["desiredFinishTime"]

    // millisecond to minute
    timeDiff = Math.ceil(timeDiff / (60 * 1000))

    diff = desiredTime - Math.abs(timeDiff)
    diff = Math.min(diff, desiredTime)

    let score = points + 10 * diff
    score = Math.floor(Math.max(10, score))
    score -= Math.abs(5 * (userData["games"][currentGame]["attempts"]))

    return {
        status: 1,
        score
    }
}
const gameThree = (gameData, userData) => {

    let currentGame = userData["currentGame"]

    let timeDiff = Date.now() - userData["games"][currentGame]["startTime"]

    let points = gameData["points"], desiredTime = gameData["desiredFinishTime"]

    // millisecond to minute
    timeDiff = Math.ceil(timeDiff / (60 * 1000))

    diff = desiredTime - Math.abs(timeDiff)
    diff = Math.min(diff, desiredTime)

    let score = points + 10 * diff
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
    score -= Math.abs(5 * (userData["games"][currentGame]["attempts"] - 1))
    // console.log(score);

    return {
        status: 1,
        score
    }
}

const gameFive = (gameData, userData, userAnswer) => {

    /* supposed answer
        0 yes
        1 yes
        2 yes
        3 conflict with 7
        4 conflict with 6
        5 no
        6 conflict with 4
        7 conflict with 3
    */

    let skip = [3, 7, 4, 6]
    let score = gameData["points"]
    // console.log(score);

    let gAns = gameData["answer"]
    for (let i = 0; i < gAns.length; ++i) {
        if (skip.indexOf(i) != -1) continue
        if (userAnswer[i].toLowerCase() != gAns[i].toLowerCase()) {
            score -= 10
        }
    }

    let tempPoints = 0
    tempPoints += (userAnswer[3].toLowerCase() == userAnswer[7].toLowerCase()) ? 1 : -2
    tempPoints += (userAnswer[3].toLowerCase() == userAnswer[7].toLowerCase()) ? 1 : -2

    score += tempPoints * 10

    // console.log(score);
    let currentGame = userData["currentGame"]

    let timeDiff = Date.now() - userData["games"][currentGame]["startTime"]

    // millisecond to minute
    timeDiff = Math.ceil(timeDiff / (60 * 1000))

    let desiredTime = gameData["desiredFinishTime"]
    let diff = desiredTime - timeDiff
    // console.log(diff);

    score += 10 * diff
    // console.log(score);


    score = Math.floor(Math.max(10, score))

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
    4: gameFour,
    5: gameFive
}

module.exports = { gameLogic }