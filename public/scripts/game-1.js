window.onload = () => {

    hideLoader()

    let ans = document.getElementById("answer")
    document.getElementById("ans-btn").onclick = async () => {
        showBtnLoader()

        let trimAns = ans.value.trim()

        if (trimAns.length == 0) {
            errorMsg("Enter Answer !")
            return
        }

        let data = {
            answer: trimAns
        }
        // console.log(data);
        let res = await postData("/checkAnswer", data)
        // console.log(res);

        if (res["status"] == 1) {
            successMsg("accepted")
            successMsg("redirecting to next game")
            window.location = "/game"
        } else {
            errorMsg("incorrect")
        }
    }
}