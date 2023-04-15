let QnA = [
    {
        "question": "Do you think Chemist is Drunk ?",
        "option1": "Yes",
        "option2": "No",
    },
    {
        "question": "Is Mr. M. J. noble a responsible person ?",
        "option1": "Yes",
        "option2": "No",
    },
    {
        "question": `Due to the intoxicated nature of chemist, what would you like to do ? 
        <br> <br>

        <span span class= "text-bg" > Hit "Submit" </span>: Advance with the reaction, knowing that the resulting quality will be subpar, but still receive points from the stage ?

         <br><br> or <br><br>
         
         <span class="text-bg"> Hit "End Test"</span>: Delay the reaction until the next day in the hopes of obtaining better quality of produce, but end the test.`,
        "option1": "Yes",
        "option2": "No",
    }
]
let qIndex = -1
let ans1, ans2, ques, res = [];
window.onload = () => {

    ques = document.getElementById("question")
    ans1 = document.getElementById("ans1")
    ans2 = document.getElementById("ans2")
    nextQ()

    hideLoader()

    ans1.onclick = () => {
        res.push(QnA[qIndex]["option1"])
        nextQ()
    }
    ans2.onclick = () => {
        res.push(QnA[qIndex]["option2"])
        nextQ()
    }

    document.getElementById("ans-btn").onclick = async () => {
        await submitFunc("1")
    }
    document.getElementById("end-test-btn-1").onclick = async () => {
        await submitFunc("0")
    }
}
const submitFunc = async (num) => {
    showBtnLoader()
    let temp = [...res, num]
    // let res = await postData("/checkAnswer", { answer: temp })
    console.log(temp);
    successMsg("accepted")
    successMsg("redirecting to next game")
    window.location = "/game"
}
const nextQ = () => {
    qIndex++
    ques.innerHTML = QnA[qIndex]["question"]
    if (qIndex == QnA.length - 1) {
        ans1.style.display = "none"
        ans2.style.display = "none"
        return
    }
    ans1.innerText = QnA[qIndex]["option1"]
    ans2.innerText = QnA[qIndex]["option2"]
}