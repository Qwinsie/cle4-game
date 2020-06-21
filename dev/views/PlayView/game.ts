/// <reference path="GameObject/robot.ts"/>
/// <reference path="GameObject/code.ts"/>
/// <reference path="GameObject/enemy1.ts"/>
/// <reference path="GameObject/enemy2.ts"/>
/// <reference path="GameObject/tree.ts"/>
/// <reference path="GameObject/background.ts"/>

class Game {
    // Fields
    private div : HTMLElement
    private batterydiv
    private gameobjects : GameObject[] = []

    public score : number = 0
    private robot : Robot
    private background : Background
    private timer : number = 0
    private realtimer : number = 0
    private maxtimer : number = 0

    private gameObjectsWithoutRobot2

    public playingTerminal : boolean = false
    public terminalCount : number = 0
    public currentTerminal : GameTerminal1
    
    private finished : boolean = false

    // Inputs
    // private upKey : number = 87
    // private downKey : number = 83
    // private leftKey : number = 65
    // private rightKey : number = 68

    // private oneKey : number = 74
    // private twoKey : number = 75
    // private threeKey : number = 76
    // private fourKey : number = 73
    // private fiveKey : number = 79
    // private sixKey : number = 80

    // private spaceKey : number = 32
    // private escapeKey : number = 27

    // Constructor 
    constructor() {
        this.div = document.createElement("div")

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.div)

        this.batterydiv = document.getElementsByTagName("battery")[0]

        // Spawning random clouds
        for (let i = 0; i < 1; i++) {
            let randomX = 400 * i * Math.random() + 200
            let randomY = Math.random() * 200 + 100
            let randomXSpeed = 0.1 
            let randomCloudNumber = Math.floor(Math.random() * (4 - 1) ) + 1;
            let randomCloud = "cloud" + randomCloudNumber
            this.gameobjects.push(new Cloud(randomX,randomY,randomCloud,randomXSpeed,this))
        }
        
        // Pushing all gameobjects for the Game with parameters (x,y,"name")
        this.background = new Background(0, 0, "background", this)
        this.gameobjects.push(this.background)

        this.gameobjects.push(new Tree(1200,400,"tree",this))
        
        this.gameobjects.push(new Checkpoint(2000,470,"checkpoint",this))
        this.gameobjects.push(new Enemy1(3000,630,"enemy1",this))
        this.gameobjects.push(new Enemy2(3500,630,"enemy2",this))
        this.gameobjects.push(new Code(1200,500,"code",this))
        this.gameobjects.push(new Sign(700,400,"sign",this))
        this.gameobjects.push(new Endpoint(4000,470,"endpoint",this))

        this.gameObjectsWithoutRobot2 = this.gameobjects

        this.robot = new Robot(200, 600, "robot", this)
        this.gameobjects.push(this.robot)
        
        this.timer = 0 /* The timer that counts the amount of seconds */
        this.realtimer = 10 /* The amount of seconds that the player start with */
        this.maxtimer = this.realtimer

        this.gameLoop()
    }

    public gameLoop(): void {
        this.timerUpdate()
        
        // update gameobjects OR game terminal
        if (!this.playingTerminal) {
            // Looping through the array of gameobjects to use for collision.
            for (const gameobject of this.gameobjects) {
                this.checkRobotCollisions()
                gameobject.update()
            }
        } else {
            this.currentTerminal.update()
        }

        requestAnimationFrame(() => this.gameLoop())
    }

    private timerUpdate(): void {
        
        this.timer++
        // Timer that counts the amount of seconds. (not perfect)
        if(this.timer > (60 * 2.75)) {
            this.realtimer--
            console.log(`Timer: ${this.realtimer}`)
            let timeperc = Math.round(100*this.realtimer/this.maxtimer)
            document.getElementsByTagName("timerperc")[0].innerHTML = `${timeperc}%`
            this.timer = 0
        }
        // Resets when battery is at 0% 
        if(this.realtimer <= 0) {
            this.reset()
        }
        // Checks what kind of battery indicator needs to be shown.
        if(this.realtimer <= this.maxtimer/100*10) { /* 10% */
            this.batterydiv.className = "shutter"
        } else if (this.realtimer <= this.maxtimer/100*25) { /* 25% */
            this.batterydiv.className = "red"
        } else if (this.realtimer <= this.maxtimer/100*50) { /* 50% */
            this.batterydiv.className = "orange"
        } else if (this.realtimer <= this.maxtimer/100*75) { /* 75% */
            this.batterydiv.className = "yellow"
        } else if (this.realtimer <= this.maxtimer/100*100) { /* 100% */
            this.batterydiv.className = "green"
        }
    }

    private checkRobotCollisions(): void {
        // Checking if there is collision between the Robot and other gameobjects.
        for (const gameObjectWithoutRobot of this.gameObjectsWithoutRobot2)
            if (this.checkCollision(this.robot.getFutureRectangle(), gameObjectWithoutRobot.getRectangle())) {
                
                if (gameObjectWithoutRobot instanceof Code) {
                    gameObjectWithoutRobot.collected = true
                    this.updateScore(1)
                    // Switch function for knowing which terminal is played. 
                    switch(this.terminalCount){
                        case 0:
                            this.launchGameTerminal1()
                            break;
                    }
                }

                if (gameObjectWithoutRobot instanceof Checkpoint) {
                    this.realtimer = this.maxtimer + 1
                    gameObjectWithoutRobot.reached = true
                }

                if (gameObjectWithoutRobot instanceof Endpoint) {
                    gameObjectWithoutRobot.reached = true
                    this.finished = true
                }

                if (gameObjectWithoutRobot instanceof Tree) {
                    gameObjectWithoutRobot.fixed = true
                }

                if (gameObjectWithoutRobot instanceof Enemy1) {
                    this.updateScore(1)
                    gameObjectWithoutRobot.kill()
                }
                if (gameObjectWithoutRobot instanceof Enemy2) {
                    this.updateScore(1)
                    gameObjectWithoutRobot.kill()
                }
   
            }
    }

    private checkCollision(a: ClientRect, b: ClientRect): boolean {
        return (a.left <= b.right &&
                b.left <= a.right &&
                a.top <= b.bottom &&
                b.top <= a.bottom)
    }

    public checkBackgroundCanmove(left:boolean, right:boolean) : boolean {
        // CHECKS HERE IF BACKGROUND CAN MOVE OR NOT
        let bgposition = this.background.getRectangle() as DOMRect
        if(bgposition.left >= 0 && left == true) {
            // bg does not scroll if you walk left while bg is already to left
            return false
        } 
        // console.log(bgposition.width - window.innerWidth)
        if(bgposition.width - window.innerWidth < bgposition.x && right == true ) {
            // bg does not scroll if you walk right while bg is already to right
            return false
        }

        // bg may scroll
        return true
    }

    private updateScore(addScoreAmount: number) {
        this.score += addScoreAmount
        document.getElementsByTagName("score")[0].innerHTML = `Score: ${this.score}`
    }
    
    // Launch Terminal (Puzzle 1)
    private launchGameTerminal1(): void {
        this.playingTerminal = true
        console.log("TERMINAL STARTING")
        this.currentTerminal = new GameTerminal1(this)
        this.playingTerminal = true
        this.terminalCount = 1
    }

    public reset(): void {
        location.reload();
    }
}
window.addEventListener("load", () => new Game())