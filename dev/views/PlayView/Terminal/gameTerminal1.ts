/// <reference path="terminal1Player.ts"/>
/// <reference path="terminal1Block.ts"/>

class GameTerminal1 {
    // Fields
    private _div : HTMLElement
    private gameInstance : Game

    private player : Terminal1Player
    private block : Terminal1Block
    private block2 : Terminal1Block
    private background : Terminal1Background
    private border : Terminal1Border

    private score : number = 0

    private countdown : number = 0
    private timer : number

    private blinkBool : boolean = true

    // Inputs
    private xKey : number

    // Constructor
    constructor(gameInstance : Game) {
        console.log("TERMINAL CLASS STARTED")

        this._div = document.createElement("div")

        this.gameInstance = gameInstance

        let game = document.getElementsByTagName("gameterminal1")[0]
        game.appendChild(this._div)

        this.xKey = 100

        this.player = new Terminal1Player()
        this.block = new Terminal1Block(70, -400)
        this.block2 = new Terminal1Block(720, -400)
        this.background = new Terminal1Background()
        this.border = new Terminal1Border()

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))

        

        this.update()
        //Countdown
        this.terminalCountdown(4)
        

    }

    // gameLoop
    public update(){
        this.player.update()
        this.block.update()
        this.block2.update()

        this.checkBlockPlayerCollision(this.player)

        

        // console.log("terminal 1 gameloop")

        //if(this.gameInstance.playingTerminal1) {
        //    requestAnimationFrame(()=>this.gameLoop())
        //}
    
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

    

    // Delay function for timer, creates delay between each count
    private delay(delay: number){
        return new Promise(r => {
            setTimeout(r, delay)
        })
    }

    
    // Function for making block blink between red and original
    private blockBlinker(r:any){
        setInterval(function(){
            if(this.blinkBool){
                r.classlist.add('terminal-block-blink')
                this.blinkBool = false
            } else {
                r.classlist.remove('terminal-block-blink')
                this.blinkBool = true
            }
        }, 1500)
    }

    // Choose between two intervals to select random blocks and make it blink
    async getRandomBlockBlink(){

        for(let i = 0; i < 4; i++){
            await this.delay(5000)
            let randomNumber = Math.floor(Math.random() * 2) + 0
            let getRandomBlock = document.getElementsByTagName("terminal1block")[randomNumber]
            this.blockBlinker(getRandomBlock)
        }
        


    }

    // Global gametimer function (getSeconds = total seconds, getType = what type counter)
    async terminalCountdown(getSeconds: number)  {

            this.countdown = getSeconds
            for(let i = getSeconds; i > 0; i--){
                    
                await this.delay(1500)
                this.countdown = this.countdown - 1
                
                
                document.getElementsByTagName("message")[0].innerHTML = `${this.countdown}`
                if(this.countdown == 0){
                    document.getElementsByTagName("message")[0].innerHTML = ''
                    this.terminalTimer(0)
                    this.getRandomBlockBlink()
                }
            }
        
    }

    async terminalTimer(getSeconds:number){
        this.timer = getSeconds
            for(let i = getSeconds; i >= 0; i++){
                await this.delay(1000)
                this.timer = this.timer + 1
                console.log(this.timer)
            }
    }

    checkBlockPlayerCollision(player : Terminal1Player) {

        let hit = this.checkCollision(player.getRectangle(), this.block.getRectangle())
        let hit2 = this.checkCollision(player.getRectangle(), this.block2.getRectangle())

        if (hit) {
            this.updateScore(-1)
            this.gameOver()
        }

        if (hit2) {
            this.updateScore(2)
            this.gameWin()
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
        console.log("GAME OVER")
        document.getElementsByTagName("message")[0].innerHTML = `Game Over`
        this.killAll()
        this.gameInstance.playingTerminal = false
        this.gameInstance.reset()
    }

    gameWin() {
        this.killAll()
        this.gameInstance.playingTerminal = false
    }

    finnishGame() {
        this.killAll()
        this.gameInstance.playingTerminal = false
    }

    killAll() {
        this.block.div.remove()
        this.block2.div.remove()
        this.player.div.remove()
        this.background.div.remove()
        this.border.div.remove()
    }

    sleep(milliseconds : number) {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
      }
}