window.addEventListener("load", init)

let $form = null;
let $nameField = null;
let $scoreField = null;

let currentScore = null;

function init() {
    // getAllScores()

    // Check if localStorage werkt
    if (typeof window.localStorage === "undefined") {
        console.error('Local storage is not available in your browser');
        return;
    }

    // Get Name + Score from LocalStorage
    let currentScore = getScore()
    let name = localStorage.getItem('name')
    console.log(currentScore);

    // Add Name + Score in Leaderboard
    addScore(name, currentScore)

    // Get HTML Tags from Form
    $form = document.getElementById('form');
    $nameField = document.getElementById('name');
    $scoreField = document.getElementById('score');

    fillFieldsFromLocalStorage();

    // Send Data to LocalStorage
    $form.addEventListener('submit', submitHandler);
}

function addScore(name, score) {
    console.log(name + " " + score);

        let list = document.querySelector("#scores")
        
        const newli = document.createElement("li")
        newli.innerHTML = `${name} ${score}`
}

function getScore() {
    let score = localStorage.getItem('score')
    if(score) {
        return JSON.parse(score)
    } else {
        return []
    }
}

function fillFieldsFromLocalStorage()
{
    if (localStorage.getItem('name') !== null) {
        $nameField.value = localStorage.getItem('name');
        $scoreField.value = localStorage.getItem('score');
    }
}

function submitHandler(e)
{
    e.preventDefault();
    localStorage.setItem('name', $nameField.value);
    localStorage.setItem('score', $scoreField.value);
}

// function getAllScoresErrorHandler(data) {
//     console.log(data)
// }

// function getAllScores() {
//     fetch('../json/leaderboard.json')
//     .then(function(response){
//         if(response.status == 200 && response.ok){
//             console.log("alles in orde!")
//             return response.json() // JSON.parse
//         }
//         throw new Error(response.statusText)
//         //OF
//         console.log("Er gaat iets fout")
//         // console.log(response.status)
//         // console.log(response.ok)
//     })
//     .then(getAllScoresSuccesHandler)
//     .catch(getAllScoresErrorHandler)
// }

// function getAllScoresSuccesHandler(data, currentScore) {
//     console.log(currentScore);
    
//     results = data.results
//     console.log(data.results);
    
//     for (let i = 0; i < results.length;i++){

//         let h = document.querySelector("#title")
//         h.innerHTML = "Leaderboard"

//         let list = document.querySelector("#scores")
        
//         const newli = document.createElement("li")
//         newli.innerHTML = `${results[i].name} ${results[i].score} ${currentScores}`
//         list.appendChild(newli)

//         window.addEventListener("click", doSomething)

//         function doSomething(event) {
//             console.log("You clicked somewhere")
//         }
//     }
// }
