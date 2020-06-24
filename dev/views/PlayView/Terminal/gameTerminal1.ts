/// <reference path="terminal1Player.ts"/>
/// <reference path="terminal1Block.ts"/>
/// <reference path="terminal2Block.ts"/>

class GameTerminal1 {
    // Fields
    private _div : HTMLElement
    private gameInstance : Game

    private player : Terminal1Player
    private block : Terminal1Block
    private block2 : Terminal2Block
    private background : Terminal1Background
    private border : Terminal1Border

    private score : number = 0

    private countdown : number = 0
    private timer : number

    private blinkBool : boolean = false
    private chosenBlock : boolean = false
    private totalBlinks : number = 3
    private blinkInterval : any
    protected blinkStop : boolean = false
    public block1Fall : boolean = false
    public block2Fall : boolean = false

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
        this.block2 = new Terminal2Block(720, -400)
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
    private blockBlinker(r:any, type:string){
        this.chosenBlock = true
        if(type == "start"){
            this.blinkInterval = setInterval(function(){
                if(this.blinkBool){
                    r.classList.add('terminal-block-blink')
                    this.blinkBool = false
                } else {
                    r.classList.remove('terminal-block-blink')
                    this.blinkBool = true
                }
            }, 500)
        } else if(type == "stop"){
            this.chosenBlock = true
            this.blinkBool = false
            clearInterval(this.blinkInterval)
            r.classList.remove("terminal-block-blink")
        }
        

    }

    // Choose between two intervals to select random blocks and make it blink
    async getRandomBlockBlink(){
        if(!this.chosenBlock){
            this.blinkBool = true
            let randomNumber = Math.floor(Math.random() * 2) + 0
            let blocks = [document.getElementsByTagName("terminal1block")[0], document.getElementsByTagName("terminal2block")[0]]
            let getRandomBlock = blocks[randomNumber]
            this.blockBlinker(getRandomBlock, "start")

            for(let i = this.totalBlinks; i > 0; i--){
                await this.delay(1000)
                this.totalBlinks = this.totalBlinks - 1

                console.log(this.totalBlinks)
                if(this.totalBlinks == 0){
                    this.blinkStop = true

                    //Make block fall booleans true depended on the random number
                    if(randomNumber == 0){
                        this.block.makeBlockMove(true, 50)
                        if(this.block.makeBlockMove(true, 50)){
                            this.terminalTimer(0)
                        }
                    } else if(randomNumber == 1){
                        this.block2.makeBlockMove(true, 50)
                        if(this.block2.makeBlockMove(true, 50)){
                            this.terminalTimer(0)
                        }
                    }

                    this.blockBlinker(getRandomBlock, "stop")
                    
                }
                
                
            }

            
        }
        
    }

    // Global gametimer function (getSeconds = total seconds, getType = what type counter)
    async terminalCountdown(getSeconds: number)  {

            this.countdown = getSeconds
            for(let i = getSeconds; i > 0; i--){
                    
                await this.delay(600)
                this.countdown = this.countdown - 1
                
                
                document.getElementsByTagName("message")[0].innerHTML = `${this.countdown}`
                if(this.countdown == 0){
                    document.getElementsByTagName("message")[0].innerHTML = ''
                    this.getRandomBlockBlink()
                    
                    
                }
            }
        
    }

    async terminalTimer(getSeconds:number){
        this.timer = getSeconds
            for(let i = getSeconds; i < 3; i++){
                await this.delay(1000)
                this.timer = this.timer + 1
                if(this.timer == 3){
                    this.gameWin()
                    this.updateScore(2)
                }
            }
    }

    checkBlockPlayerCollision(player : Terminal1Player) {

        let hit = this.checkCollision(player.getRectangle(), this.block.getRectangle())
        let hit2 = this.checkCollision(player.getRectangle(), this.block2.getRectangle())

        if (hit || hit2) {
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