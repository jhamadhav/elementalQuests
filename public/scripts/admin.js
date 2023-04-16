import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, signOut } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCqMd47g0ZX0saJRi_1qlH1few24qg_VRk",
    authDomain: "elemental-quests-firebase.firebaseapp.com",
    projectId: "elemental-quests-firebase",
    storageBucket: "elemental-quests-firebase.appspot.com",
    messagingSenderId: "704041297836",
    appId: "1:704041297836:web:21a4542ef3f2af6d613c09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()

let { min, max, round, floor } = Math
let allData = {}
window.onload = async () => {

    allData = await postData("/admin")
    // console.log(allData);

    hideLoader()

    displayBellCurve("totalScore", allData["globalData"]["finalScore"])


    // fill all users email in select options
    let userDrop = document.getElementById("user-dropdown")
    userDrop.innerHTML = ""
    let userList = allData["allUserData"]
    // console.log(userList);

    for (let i = 0; i < userList.length; ++i) {
        userDrop.innerHTML += `
        <option value="${i}">${userList[i]["email"]}</option>
        `
    }

    displayUserData(0)
    document.getElementById("user-display-btn").onclick = () => {
        displayUserData(Number(userDrop.value))
    }

    document.getElementById("submit-logout").onclick = async () => {
        logoutUser()
    }

    document.getElementById("bell-curve-btn").onclick = () => {
        let dataType = document.getElementById("bell-dropdown").value

        if (dataType == "totalScore") {
            displayBellCurve(dataType, allData["globalData"]["finalScore"])
            return
        }
        if (dataType == "totalTime") {
            displayBellCurve(dataType, allData["globalData"]["finishTime"])
            return
        }
        displayBellCurve(dataType, allData["globalData"]["skills"][dataType])

    }
}

const displayBellCurve = (xTitle, inpData) => {
    Highcharts.chart('bell-curve', {

        title: {
            text: 'Bell curve'
        },

        xAxis: [{
            title: {
                text: xTitle
            },
            alignTicks: false,
        }, {
            title: {
                text: ''
            },
            alignTicks: false,
            opposite: true
        }],

        yAxis: [{
            title: { text: 'Score' }
        }, {
            title: { text: '' },
            opposite: true
        }],

        series: [{
            name: 'Bell curve',
            type: 'bellcurve',
            xAxis: 1,
            yAxis: 1,
            baseSeries: 1,
            zIndex: -1
        }, {
            name: 'Data',
            type: 'scatter',
            data: inpData,
            accessibility: {
                exposeAsGroupOnly: true
            },
            marker: {
                radius: 1.5
            }
        }]
    });
}

const displayUserData = (val) => {
    let data = {
        "maxData": allData["maxData"],
        "globalData": allData["globalData"],
        "userData": allData["allUserData"][val]
    }
    displayResult(data)
}

const displayResult = (data) => {
    let totalScoreDiv = document.getElementById("total-score")
    totalScoreDiv.innerText = `${data["userData"]["totalScore"]}/${data["maxData"]["totalScore"]}`

    // normalize skills
    let skillsData = []
    let skills = Object.keys(data["userData"]["skillScore"])
    let skillPoints = []
    for (let i = 0; i < skills.length; ++i) {

        let num = data["userData"]["skillScore"][skills[i]] * 100 / data["maxData"]["skills"][skills[i]]
        num = round(num, 2)

        skillPoints.push(num)
        skillsData.push([skills[i].toString(), num])
    }
    // console.log(skillsData);

    // skill bar graph 
    Highcharts.chart('skill-bar-graph', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Soft skill bar-graph '
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Soft skill score (out of 100)'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: '<b>{point.y:.1f}</b>'
        },
        series: [{
            name: 'soft-skill-scores',
            data: skillsData,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });

    // skill spider-web-graph
    Highcharts.chart('skill-spider-web-graph', {

        chart: {
            polar: true,
            type: 'line'
        },

        accessibility: {
            description: ''
        },

        title: {
            text: 'Soft skill: spiderweb graph',
            x: -80
        },

        pane: {
            size: '80%'
        },

        xAxis: {
            categories: skills,
            tickmarkPlacement: 'on',
            lineWidth: 0
        },

        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0,
            max: 100
        },

        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f} / 100</b><br/>'
        },

        legend: {
            align: 'right',
            verticalAlign: 'middle',
            layout: 'vertical'
        },

        series: [{
            name: 'Scored',
            data: skillPoints,
            pointPlacement: 'on'
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom',
                        layout: 'horizontal'
                    },
                    pane: {
                        size: '70%'
                    }
                }
            }]
        }

    });

    let games = Object.keys(data["userData"]["games"])
    let timeData = []
    let totalTime = 0
    for (let i = 0; i < games.length; ++i) {
        let diff = data["userData"]["games"][games[i]]["endTime"] - data["userData"]["games"][games[i]]["startTime"]
        diff = round(diff / (60 * 1000), 4)

        totalTime += diff

        let name = `stage-${games[i]}`
        timeData.push([name, diff])
    }
    // time spent on each game pie chart
    Highcharts.chart('game-time-chart', {
        chart: {
            styledMode: true
        },
        title: {
            text: `Total Time Taken: ${totalTime} minutes`
        },
        xAxis: {
            categories: []
        },
        series: [{
            type: 'pie',
            allowPointSelect: true,
            keys: ['name', 'y', 'selected', 'sliced'],
            data: timeData,
            showInLegend: true
        }]
    });

    let scoreData = []
    let attemptData = []
    for (let i = 0; i < games.length; ++i) {
        scoreData.push(data["userData"]["games"][games[i]]["score"])
        attemptData.push(data["userData"]["games"][games[i]]["attempts"])
    }

    // add data for each stage
    Highcharts.chart('each-stage', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Stage Stat'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: games,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Score'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Score',
            data: scoreData

        }, {
            name: 'Time',
            data: timeData

        }, {
            name: 'attempts',
            data: attemptData
        }]
    });

}

const postData = async (url = "") => {
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
        body: JSON.stringify({})
    });
    return response.json();
}

const logoutUser = () => {
    signOut(auth).then(() => {
        document.cookie = "idToken=";
        console.log("logged out");

        successMsg("logged out");
        window.location = "/"
    }).catch((error) => {
        console.log("error in log out");
        console.log(error);

        errorMsg("error in log out");
    });
}

const successMsg = (txt) => {
    iziToast.success({ title: "Success", message: txt })
}
const errorMsg = (txt) => {
    iziToast.error({ title: "Error", message: txt })
}

const hideLoader = () => {
    let loader = document.getElementsByClassName("loader-container")
    loader[0].style.display = "none"
}