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

let { min, max, round } = Math

window.onload = async () => {
    hideLoader()
    document.getElementById("submit-logout").onclick = async () => {
        logoutUser()
    }

    let res = await getData("/result")
    // let res = data
    // console.log(res);

    displayResult(res)
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
}

const getData = async (url = "") => {
    const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer"
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