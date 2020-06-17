/// <reference path="GameObject/robot.ts"/>
/// <reference path="GameObject/code.ts"/>
/// <reference path="GameObject/enemy1.ts"/>
/// <reference path="GameObject/enemy2.ts"/>
/// <reference path="GameObject/tree.ts"/>
/// <reference path="GameObject/background.ts"/>

class Game {
    // Fields
    private div : HTMLElement
    private gameobjects : GameObject[] = []

    private score : number = 0
    private robot : Robot
    private background : Background
    private timer : number = 0

    public playingTerminal : boolean = false
    public currentTerminal : GameTerminal1
    
    // Inputs
    private upKey : number = 87
    private downKey : number = 83
    private leftKey : number = 65
    private rightKey : number = 68

    private oneKey : number = 74
    private twoKey : number = 75
    private threeKey : number = 76
    private fourKey : number = 73
    private fiveKey : number = 79
    private sixKey : number = 80

    private spaceKey : number = 32
    private escapeKey : number = 27

    // Constructor 
    constructor() {
        this.div = document.createElement("div")

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.div)

        // Pushing all gameobjects for the Game with parameters (x,y,"name")
        this.background = new Background(0, 0, "background", this)
        this.gameobjects.push(this.background)
        this.gameobjects.push(new Tree(500,400,"tree", this))
        this.gameobjects.push(new Enemy1(1000,630,"enemy1", this))
        this.gameobjects.push(new Enemy2(1200,630,"enemy2", this))
        this.gameobjects.push(new Code(300,200,"code", this))

        this.robot = new Robot(200, 600, "robot", this)
        this.gameobjects.push(this.robot)
        
        // Spawning random clouds
        for (let i = 0; i < 5; i++) {
            let randomX = 400 * i * Math.random() + 200
            let randomY = Math.random() * 200 + 100
            let randomXSpeed = 0.1 
            let randomCloudNumber = Math.floor(Math.random() * (4 - 1) ) + 1;
            let randomCloud = "cloud" + randomCloudNumber
            this.gameobjects.push(new Cloud(randomX,randomY,randomCloud,randomXSpeed,this))
        }

        // geen interval gebruiken, je hebt al een gameloop
        // de interval blijft ook doorlopen als de gameloop stopt / tab inactief is
        // setInterval(this.timeIt, 1000)
        this.gameLoop()
    }

    /*
    private timeIt() {
        this.timer - 1
        console.log(this.timer);
    }
    */
    
    public gameLoop(): void {
        this.timer++
        // hier kan je een timer bijhouden, 60fps
        //console.log(this.timer)
        
        
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

        // gameloop altijd in game.ts
        requestAnimationFrame(() => this.gameLoop())
    }

    private checkRobotCollisions(){
        // Checking if there is collision between the Robot and other gameobjects.
        for (const gameObjectWithoutRobot of this.gameobjects)
            if (this.checkCollision(this.robot.getFutureRectangle(), gameObjectWithoutRobot.getRectangle())) {

                if (gameObjectWithoutRobot instanceof Code) {
                    gameObjectWithoutRobot.collected = true
                    this.updateScore(1)
                    this.launchGameTerminal1()
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

    private checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
                b.left <= a.right &&
                a.top <= b.bottom &&
                b.top <= a.bottom)
    }

    public checkBackgroundCanmove(left:boolean, right:boolean) : boolean {
        // CHECK HIER OF DE ACHTERGROND MAG BWEGEN OF NIET
        let bgposition = this.background.getRectangle() as DOMRect
        if(bgposition.left >= 0 && left == true) {
            // bg niet scrollen als je naar links loopt terwijl bg al helemaal links staat
            return false
        } 
        console.log(bgposition.width - window.innerWidth)
        if(bgposition.width - window.innerWidth < bgposition.x && right == true ) {
            // bg niet scrollen als je naar rechts loopt terwijl bg al helemaal rechts staat
            return false
        }

        // bg kan scrollen
        return true
    }

    private updateScore(addScoreAmount: number) {
        this.score += addScoreAmount
        document.getElementsByTagName("score")[0].innerHTML = `Score: ${this.score}`
    }
    
    // Launch Terminal (Puzzle 1)
    private launchGameTerminal1(): void {
        console.log("TERMINAL STARTING")
        this.currentTerminal = new GameTerminal1(this)
        this.playingTerminal = true
    }

    public reset(): void {

        // RESET FUNCTION DOES NOT WORK !!!
        // RESET FUNCTION DOES NOT WORK !!!
        // RESET FUNCTION DOES NOT WORK !!!

        // this.score = 0
        // document.getElementsByTagName("score")[0].innerHTML = `Score: ${this.score}`
        // document.getElementsByTagName("message")[0].innerHTML = ``
        // for (const gameobject of this.gameobjects) {
        //     gameobject.div.remove()

        //     this.gameobjects.push(new Background(0,0,"background"))
        //     this.gameobjects.push(new Tree(500,400,"tree"))
        //     this.gameobjects.push(new Robot(200,600,"robot"))
        //     this.gameobjects.push(new Enemy1(1000,630,"enemy1"))
        //     this.gameobjects.push(new Enemy2(1200,630,"enemy2"))
        //     this.gameobjects.push(new Code(500,200,"code"))
        // }
        // this.gameLoop()
    }
}
window.addEventListener("load", () => new Game())