let colors = ["red", "gold"]
let octetVal = [3, 1, 9, 7, 5, 7]
let octi = 0
let minSize = 80
let data = {
    "red": 0,
    "gold": 0
}

window.onload = () => {
    hideLoader()
    genMineral()

    document.getElementById("ans-btn").onclick = async () => {
        showBtnLoader()

        let reqData = {
            answer: [data["red"], data["gold"]]
        }
        // console.log(data);
        let res = await postData("/checkAnswer", reqData)
        // console.log(res);

        if (res["status"] == 1) {
            successMsg("accepted")
            successMsg("redirecting to next game")
            window.location = "/game"
        } else {
            data = {
                "red": 0,
                "gold": 0
            }
            errorMsg("incorrect")
            errorMsg("collection of iron set to 0")
            errorMsg("collection of copper set to 0")
        }
    }
}

const genMineral = () => {
    let gameScreen = document.getElementById("game-screen")

    let div = document.createElement("div")

    let color = colors[rand(0, colors.length)]
    div.classList = `mineral ${color}`

    let cord = genCord();

    div.style.marginTop = `${cord[0]}px`
    div.style.marginLeft = `${cord[1]}px`

    cordMap[cord] = 1

    let val = octetVal[octi % octetVal.length]
    octi++

    let valDiv = document.createElement("div")
    valDiv.innerText = val

    div.appendChild(valDiv)

    div.onclick = () => {
        data[color] += val
        // console.log(data)

        div.classList.add("dim-mineral")
        setTimeout(() => {
            div.remove()
        }, 100);

        let mins = document.getElementsByClassName("mineral")

        if (mins.length > 15) return

        let n = rand(1, 4)
        // console.log(`gen: ${n}`);
        while (n--) {
            genMineral()
        }


    }

    diminish(div, rand(3000, 5000))
    gameScreen.appendChild(div)
}

const diminish = (elem, t) => {
    setTimeout(() => {
        let mins = document.getElementsByClassName("mineral")
        if (mins.length < 2) {
            genMineral()
        }

        elem.classList.add("dim-mineral")
        setTimeout(() => {
            elem.remove()
        }, 100);
    }, t);
}
const rand = (min = 0, max = 1) => {
    return Math.floor(Math.random() * (max - min) + min)
}

let cordMap = {}
const genCord = () => {
    let res = [0, 0]

    let gameScreen = document.getElementById("game-screen")

    let w = gameScreen.offsetWidth, h = gameScreen.offsetHeight

    res[0] = rand(0, h - 2 * minSize)
    res[1] = rand(0, w - 2 * minSize)
    return res
}