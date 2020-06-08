/// <reference path="GameObject/robot.ts"/>
/// <reference path="GameObject/code.ts"/>
/// <reference path="GameObject/enemy1.ts"/>
/// <reference path="GameObject/enemy2.ts"/>
/// <reference path="GameObject/tree.ts"/>

class Game {
    // Fields
    private div : HTMLElement

    private robot : Robot
    private enemy1 : Enemy1
    private enemy2 : Enemy2
    private tree : Tree
    private code : Code

    private score : number = 0

    private enemy1killed : boolean = false
    private enemy2killed : boolean = false

    public playingTerminal1 : boolean = false
    
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


    // Properties


    // Constructor 
    constructor() {
        this.div = document.createElement("div")

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.div)

        this.tree = new Tree(500,400,"tree")
        this.robot = new Robot(200,600,"robot")
        this.enemy1 = new Enemy1(1000,630,"enemy1")
        this.enemy2 = new Enemy2(1200,630,"enemy2")
        this.code = new Code(500,200,"code")

        this.gameLoop()
    }


    // Functions

    // gameLoop
    public gameLoop() {
        if (this.checkCollision(this.robot.getFutureRectangle(), this.enemy2.getRectangle()) && !this.enemy2killed) {
            //collision event enemy2
            console.log("collision")
            
            this.updateScore(1)
            this.enemy2.kill()
        }
        if (this.checkCollision(this.robot.getFutureRectangle(), this.enemy1.getRectangle()) && !this.enemy1killed) {
            //collision event enemy1
            console.log("collision")
            
            this.updateScore(1)
            this.enemy1.kill()
        }
        if (this.checkCollision(this.robot.getFutureRectangle(), this.code.getRectangle())) {
            //collision event code wolkje
            this.code.collected = true
            this.launchGameTerminal1()
            this.tree.fixed = true
            this.updateScore(1)
        }

        this.tree.update()
        this.enemy1.update()
        this.enemy2.update()
        this.robot.update()
        this.code.update()

        if(!this.playingTerminal1) {
            requestAnimationFrame(()=>this.gameLoop())
        }
    }

    // Loop Functions
    checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
                b.left <= a.right &&
                a.top <= b.bottom &&
                b.top <= a.bottom)
    }

    updateScore(addScoreAmount: number) {
        this.score += addScoreAmount
        document.getElementsByTagName("score")[0].innerHTML = `Score: ${this.score}`
    }
    
    // Launch Functions
    public launchGameTerminal1() {
        let gameTerminal1 : GameTerminal1
        console.log("TERMINAL STARTING")
        gameTerminal1 = new GameTerminal1(this)
        console.log("TERMINAL STARTED")
    }

    public reset() {
        this.score = 0
        document.getElementsByTagName("score")[0].innerHTML = `Score: ${this.score}`
        document.getElementsByTagName("message")[0].innerHTML = ``

        this.tree.div.remove()
        this.robot.div.remove()
        this.enemy1.div.remove()
        this.enemy2.div.remove()
        this.code.div.remove()

        this.tree = new Tree(500,400,"tree")
        this.robot = new Robot(200,600,"robot")
        this.enemy1 = new Enemy1(1000,630,"enemy1")
        this.enemy2 = new Enemy2(1200,630,"enemy2")
        this.code = new Code(500,200,"code")

        this.gameLoop()

    }
}
window.addEventListener("load", () => new Game())