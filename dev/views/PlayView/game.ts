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

        this.gameobjects.push(new Background(0,0,"background"))
        this.gameobjects.push(new Tree(500,400,"tree"))
        this.gameobjects.push(new Enemy1(1000,630,"enemy1"))
        this.gameobjects.push(new Enemy2(1200,630,"enemy2"))
        this.gameobjects.push(new Code(300,200,"code"))
        this.gameobjects.push(new Robot(200,600,"robot"))
        
        this.gameLoop()
    }
    
    // gameLoop
    public gameLoop() {
        
        for (const gameobject of this.gameobjects) {
            for (let i = 0; i < 1; i++) {
                
                gameobject.update(`${gameobject}`)
            
                if(gameobject instanceof Robot) {
                
                    let robot = gameobject

                        for(const gameobjectZonderRobot of this.gameobjects)
                        if (this.checkCollision(robot.getFutureRectangle(), gameobjectZonderRobot.getRectangle())) {
                            //collision event code wolkje
                            if(gameobjectZonderRobot instanceof Code) {
                                gameobjectZonderRobot.collected = true
                                this.updateScore(1)
                                this.launchGameTerminal1()
                            }
                            if(gameobjectZonderRobot instanceof Tree) {
                                gameobjectZonderRobot.fixed = true
                            }

                            if(gameobjectZonderRobot instanceof Enemy1) {
                                this.updateScore(1)
                                gameobjectZonderRobot.kill()
                            }
                            if(gameobjectZonderRobot instanceof Enemy2) {
                                this.updateScore(1)
                                gameobjectZonderRobot.kill()
                            }
                        }
                        
                        if(!this.playingTerminal1) {
                            requestAnimationFrame(()=>this.gameLoop())
                        }
                      
                }
            }
        }
    }
        
    arrayLoop() {
        for (let i = 0; i < this.gameobjects.length; i++) {
            
            return [i]
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