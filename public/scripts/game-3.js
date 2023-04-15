window.onload = () => {
    hideLoader()


    document.getElementById("ans-btn").onclick = async () => {
        showBtnLoader()

        // let reqData = {
        //     answer: [data["red"], data["gold"]]
        // }
        // // console.log(data);
        // let res = await postData("/checkAnswer", reqData)
        // // console.log(res);

        // if (res["status"] == 1) {
        //     successMsg("accepted")
        //     successMsg("redirecting to next game")
        //     window.location = "/game"
        // } else {
        //     errorMsg("incorrect")
        // }
    }
}