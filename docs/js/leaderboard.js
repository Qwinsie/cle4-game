window.addEventListener("load", init)

function init() {
    getAllScores()
}

function getAllScores() {
    fetch('../json/leaderboard.json')
    .then(function(response){
        if(response.status == 200 && response.ok){
            console.log("alles in orde!")
            return response.json() // JSON.parse
        }
        throw new Error(response.statusText)
        //OF
        console.log("Er gaat iets fout")
        // console.log(response.status)
        // console.log(response.ok)
    })
    .then(getAllScoresSuccesHandler)
    .catch(getAllScoresErrorHandler)
}

function getAllScoresSuccesHandler(data) {
    results = data.results
    console.log(data.results);
    
    for (let i = 0; i < results.length;i++){

        let h = document.querySelector("#title")
        h.innerHTML = "Leaderboard"

        let list = document.querySelector("#scores")

        const newli = document.createElement("li")
        newli.innerHTML = results[i].score
        list.appendChild(newli)

        window.addEventListener("click", doSomething)

        function doSomething(event) {
            console.log("You clicked somewhere")
        }
    }
}

function addItem(event) {
    event.stopPropagation()
    console.log(event.target.id)
    console.log("you clicked the button")
}

function getAllScoresErrorHandler(data) {
    console.log(data)
}