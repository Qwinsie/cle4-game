class ScoreBoardView {

    private createform : HTMLElement

    private $form = null;
    private  $nameField = null;
    private  $scoreField = null;
    private currentScore = null;

    constructor() {
        console.log("ScoreBoardView created");
        
        // this.currentScore = null;
        // // getAllScores()
    
        // // Check if localStorage werkt
        // if (typeof window.localStorage === "undefined") {
        //     console.error('Local storage is not available in your browser');
        //     return;
        // }
    
        // // Get Name + Score from LocalStorage
        // let currentScore = this.getScore()
        // let name = localStorage.getItem('name')
        // console.log(currentScore);
    
        // // Add Name + Score in Leaderboard
        // this.addScore(name, currentScore)
    
        // // Get HTML Tags from Form
        // this.$form = document.getElementById('form');
        // this.$nameField = document.getElementById('name');
        // this.$scoreField = document.getElementById('score');
    
        // this.fillFieldsFromLocalStorage();
    
        // // Send Data to LocalStorage
        // this.$form.addEventListener('submit', this.submitHandler);
    }

    public createForm(score: number) {
        this.createform = document.createElement("form")

        this.createform.setAttribute("action", ""); // Setting Action Attribute on Form
        this.createform.setAttribute("method", "post"); // Setting Method Attribute on Form
        
        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.createform)

        let heading = document.createElement('h2'); // Heading of Form
        heading.innerHTML = "You did it!";
        this.createform.appendChild(heading);

        var line = document.createElement('hr'); // Giving Horizontal Row After Heading
        this.createform.appendChild(line);

        var linebreak = document.createElement('br');
        this.createform.appendChild(linebreak);

        var namelabel = document.createElement('label'); // Create Label for Name Field
        namelabel.innerHTML = "Your Name : "; // Set Field Labels
        this.createform.appendChild(namelabel);

        var inputelement = document.createElement('input'); // Create Input Field for Name
        inputelement.setAttribute("type", "text");
        inputelement.setAttribute("name", "dname");
        this.createform.appendChild(inputelement);

        var linebreak = document.createElement('br');
        this.createform.appendChild(linebreak);

        var usernamelabel = document.createElement('label'); // Create Label for Address Field
        usernamelabel.innerHTML = "Score : "; // Set Field Labels
        this.createform.appendChild(usernamelabel);

        var heading2 = document.createElement('h2'); // Create Input Field for Name
        heading2.innerHTML = `${score}`
        this.createform.appendChild(heading2);

        var linebreak = document.createElement('br');
        this.createform.appendChild(linebreak);

        // this.$form = document.getElementById('form');
    }


    private addScore(name, score) {
        console.log(name + " " + score);

            let list = document.querySelector("#scores")
            
            const newli = document.createElement("li")
            newli.innerHTML = `${name} ${score}`
    }

    private getScore() {
        let score = localStorage.getItem('score')
        if(score) {
            return JSON.parse(score)
        } else {
            return []
        }
    }

    private fillFieldsFromLocalStorage() {
        if (localStorage.getItem('name') !== null) {
            this.$nameField.value = localStorage.getItem('name');
            this.$scoreField.value = localStorage.getItem('score');
        }
    }

    private  submitHandler(e) {
        e.preventDefault();
        localStorage.setItem('name', this.$nameField.value);
        // localStorage.setItem('score', $scoreField.value);


        this.currentScore.push(this.$scoreField.value)
        localStorage.setItem('score', JSON.stringify(this.currentScore))
    }
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
