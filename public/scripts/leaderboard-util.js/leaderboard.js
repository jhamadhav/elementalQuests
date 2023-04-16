const addToLeaderBoard = (i, arr) => {

    let board = document.getElementById("leaderboard");
    let newRow = `
    <tr class="row">
            <td class="cell">${i}</td>
            <td class="cell">
                ${arr[2].toLowerCase()}
            </td>
            <td class="cell robo">${arr[0]}</td>
            <td class="cell robo">${arr[1]} min</td>
    </tr>
        `

    board.innerHTML += newRow
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

let leaderBoardData = []
window.onload = async () => {

    data = await postData("/leaderboard")
    data = data["data"]
    data.sort();
    data.reverse();

    leaderBoardData = data

    // remove shadowLoads
    let shadowLoad = document.getElementsByClassName("shadowLoad")
    for (let i = 0; i < shadowLoad.length; i++) {
        shadowLoad[i].style.display = "none"
    }

    for (let i = 0; i < data.length; i++) {
        addToLeaderBoard(i + 1, data[i])
    }
}