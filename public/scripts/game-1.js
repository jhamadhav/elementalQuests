window.onload = () => {

    let ans = document.getElementById("answer")
    document.getElementById("ans-btn").onclick = async () => {
        showBtnLoader()
        let data = {
            answer: ans.value
        }
        console.log(data);
        let res = await postData("/checkAnswer", data)
        console.log(res);

        if (res["status"] == 1) {
            successMsg("accepted")
        } else {
            errorMsg("incorrect")
        }
    }
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