/// <reference path="terminal1Player.ts"/>
/// <reference path="terminal1Block.ts"/>

class GameTerminal1 {
    // Fields
    private _div : HTMLElement
    private gameInstance : Game

    private player : Terminal1Player
    private block : Terminal1Block

    private score : number = 0

    // Inputs
     private xKey : number

    // Constructor
    constructor(gameInstance : Game) {
        console.log("TERMINAL CLASS STARTED")

        this._div = document.createElement("div")

        this.gameInstance = gameInstance

        let game = document.getElementsByTagName("gameterminal1")[0]
        game.appendChild(this._div)

        this.xKey = 88

        this.player = new Terminal1Player()
        this.block = new Terminal1Block()

        this.gameInstance.playingTerminal1 = true

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))

        this.gameLoop()
    }


    // Functions

    // Init Functions

    // gameLoop
    private gameLoop(){
        this.player.update()
        this.block.update()

        this.checkBlockPlayerCollision(this.player)

        console.log("onegameloop")

        if(this.gameInstance.playingTerminal1) {
            requestAnimationFrame(()=>this.gameLoop())
        }
    
    }

    // Loop Functions
    private onKeyDown(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.xKey:
                this.finnishGame()
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.xKey:
                break
        }
    }

    checkBlockPlayerCollision(player : Terminal1Player) {

        let hit = this.checkCollision(player.getRectangle(), this.block.getRectangle())
        // let hit2 = this.checkCollision(player.getRectangle(), this.block2.getRectangle())

        if (hit) {
            this.updateScore(-1)
            this.gameOver()
        }
    }
    
    updateScore(addScoreAmount: number) {
        this.score += addScoreAmount
        // document.getElementsByTagName("score")[0].innerHTML = `Score: ${this.score}`
    }


    // General Functions
    public checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
        }

    gameOver() {
        console.log("YOU HAVE DIED")
        document.getElementsByTagName("message")[0].innerHTML = `YOU HAVE DIED`
    }

    finnishGame() {
        this.gameInstance.playingTerminal1 = false
        this.gameInstance.gameLoop()
    }
}