const addToLeaderBoard = (i, obj) => {
    let sum = obj.badge + obj.skill
    if (sum == 0) {
        return 0
    }
    let board = document.getElementById("leaderboard");
    let newRow = `
    <tr class="row">
            <td class="cell">${i}</td>
            <td class="cell">
                ${obj.name.toLowerCase()}
            </td>
            <th class="cell robo">${obj["questions"]["count"]}</th>
    </tr>
        `
    board.innerHTML += newRow
}


const init = async () => {
    let shadowLoad = document.getElementsByClassName("shadowLoad")
    for (let i = 0; i < shadowLoad.length; i++) {
        shadowLoad[i].style.display = "none"
    }

    let time = updateTime

    for (let i = 0; i < leaderBoardData.length; i++) {
        addToLeaderBoard(i + 1, leaderBoardData[i])
    }

    document.getElementById("timeUpdate").innerText = `Last Updated : ${time}`

}

// entry function
window.onload = init()