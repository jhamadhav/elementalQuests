window.onload = () => {
    hideLoader()


    document.getElementById("ans-btn").onclick = async () => {
        showBtnLoader()

        let res = await postData("/checkAnswer", { answer: "null" })

        if (res["status"] == 1) {
            successMsg("accepted")
            successMsg("redirecting to next game")
            window.location = "/game"
        } else {
            errorMsg("incorrect")
        }
    }
}