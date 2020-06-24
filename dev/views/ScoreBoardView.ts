class ScoreBoardView {

    private createform
    private form = document.querySelector('form');
    private input = document.getElementById('item');
    private item = localStorage.getItem('name');
    private currentscore : number = 0
    
    constructor(score:number) {
        this.currentscore = score

        this.createForm(score)
        
        this.form.addEventListener('submit', function (e) {
        e.preventDefault();

        localStorage.setItem('name', this.input.value);
        this.input.value = "";
        });
        
    }

    public createForm(score: number) {

        this.createform = document.createElement("form")
        
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
        inputelement.setAttribute("id", "item");
        inputelement.setAttribute("type", "text");
        this.createform.appendChild(inputelement);

        var linebreak = document.createElement('br');
        this.createform.appendChild(linebreak);

        var usernamelabel = document.createElement('label'); // Create Label for Address Field
        usernamelabel.innerHTML = "Score : "; // Set Field Labels
        this.createform.appendChild(usernamelabel);

        var heading2 = document.createElement('h2'); // Create Input Field for Name
        heading2.innerHTML = `${score}`
        this.createform.appendChild(heading2);
        
    }
}

//     private createform : HTMLElement

//     private form = null;
//     private  $nameField = null;
//     private  $scoreField = null;
//     private currentScore = null;
//     }
// }

    /// OLD

//     constructor(score:number) {
//         console.log("ScoreBoardView created");
        
//         // this.currentScore = null;
//         // // getAllScores()
    
//         // // Check if localStorage werkt
//         if (typeof window.localStorage === "undefined") {
//             console.error('Local storage is not available in your browser');
//             return;
//         }

//         this.createForm(score)
    
//         // // Get Name + Score from LocalStorage
    
//         // // Add Name + Score in Leaderboard
//         this.addScore(this.$nameField.value, score)
    
//         // // Get HTML Tags from Form
//         this.form = document.getElementById('form');
//         this.$nameField = document.getElementById('name');
//         this.$scoreField = document.getElementById('score');
    
//         // this.fillFieldsFromLocalStorage();
    
//         // // Send Data to LocalStorage
//         this.createform.addEventListener('submit', this.submitHandler(e) => {

//         });
//     }

//     public createForm(score: number) {
//         this.createform = document.createElement("form")

//         this.createform.setAttribute("action", "../leaderboard.html"); // Setting Action Attribute on Form
//         this.createform.setAttribute("method", "post"); // Setting Method Attribute on Form
        
//         let game = document.getElementsByTagName("game")[0]
//         game.appendChild(this.createform)

//         let heading = document.createElement('h2'); // Heading of Form
//         heading.innerHTML = "You did it!";
//         this.createform.appendChild(heading);

//         var line = document.createElement('hr'); // Giving Horizontal Row After Heading
//         this.createform.appendChild(line);

//         var linebreak = document.createElement('br');
//         this.createform.appendChild(linebreak);

//         var namelabel = document.createElement('label'); // Create Label for Name Field
//         namelabel.innerHTML = "Your Name : "; // Set Field Labels
//         this.createform.appendChild(namelabel);

//         var inputelement = document.createElement('input'); // Create Input Field for Name
//         inputelement.setAttribute("type", "text");
//         inputelement.setAttribute("name", "dname");
//         this.createform.appendChild(inputelement);

//         var linebreak = document.createElement('br');
//         this.createform.appendChild(linebreak);

//         var usernamelabel = document.createElement('label'); // Create Label for Address Field
//         usernamelabel.innerHTML = "Score : "; // Set Field Labels
//         this.createform.appendChild(usernamelabel);

//         var heading2 = document.createElement('h2'); // Create Input Field for Name
//         heading2.innerHTML = `${score}`
//         this.createform.appendChild(heading2);

//         var linebreak = document.createElement('br');
//         this.createform.appendChild(linebreak);

//         var submitelement = document.createElement('button'); // Append Submit Button
//         submitelement.setAttribute("type", "submit");
//         submitelement.setAttribute("name", "dsubmit");
//         submitelement.setAttribute("value", "Submit");
//         this.createform.appendChild(submitelement);

//         this.form = document.getElementById('form');
        
//     }


//     private addScore(name, score) {
//         console.log(name + " " + score);

//             let list = document.querySelector("#scores")
            
//             const newli = document.createElement("li")
//             newli.innerHTML = `${name} ${score}`
//     }

//     private  submitHandler(e) {
//         e.preventDefault();
//         localStorage.setItem('name', this.$nameField.value);
//         // localStorage.setItem('score', $scoreField.value);
//         console.log("Submitted");

//         this.currentScore.push(this.$scoreField.value)
//         localStorage.setItem('score', JSON.stringify(this.currentScore))
//     }
// }
// // function getAllScoresErrorHandler(data) {
// //     console.log(data)
// // }

// // function getAllScores() {
// //     fetch('../json/leaderboard.json')
// //     .then(function(response){
// //         if(response.status == 200 && response.ok){
// //             console.log("alles in orde!")
// //             return response.json() // JSON.parse
// //         }
// //         throw new Error(response.statusText)
// //         //OF
// //         console.log("Er gaat iets fout")
// //         // console.log(response.status)
// //         // console.log(response.ok)
// //     })
// //     .then(getAllScoresSuccesHandler)
// //     .catch(getAllScoresErrorHandler)
// // }

// // function getAllScoresSuccesHandler(data, currentScore) {
// //     console.log(currentScore);
    
// //     results = data.results
// //     console.log(data.results);
    
// //     for (let i = 0; i < results.length;i++){

// //         let h = document.querySelector("#title")
// //         h.innerHTML = "Leaderboard"

// //         let list = document.querySelector("#scores")
        
// //         const newli = document.createElement("li")
// //         newli.innerHTML = `${results[i].name} ${results[i].score} ${currentScores}`
// //         list.appendChild(newli)

// //         window.addEventListener("click", doSomething)

// //         function doSomething(event) {
// //             console.log("You clicked somewhere")
// //         }
// //     }
// // }
