/// <reference path="../gameobject.ts"/>

class Enemy2 extends GameObject {

    private alive : boolean = true
    private timer : number = 0

    constructor(xStart: number, yStart: number, name: string, game: Game) {
        super(xStart, yStart, name, game)

        this.enemyJumpTimer(0)
    }

    public update() {
        // Standard Velocity values for Enemy2 to jump
        this.yVelo += 1.4;
        this._y += this.yVelo;
        this.yVelo *= 0.90;

        // When Enemy2 hits the ground, stop.
        if(this._y > 600){
            this._y = 600;
            this.yVelo = 0;
        }


        super.update()
    }

    // Delay function for timer, creates delay between each count
    private delay(delay: number){
        return new Promise(r => {
            setTimeout(r, delay)
        })
    }

    async enemyJumpTimer(getSeconds:number){
        this.timer = getSeconds
            for(let i = getSeconds; i >= 0; i++){
                await this.delay(3000)
                this.timer = this.timer + 1
                console.log(this.timer)
                if(this.timer == 3){
                    console.log("Jump!")
                    this.jump()
                    this.timer = 0
                }
            }
    }

    public jump() {
        this.jumping = true;
        this.yVelo -= 40; // Height of the jump
    }

    public kill() {
        this.alive = false
        this._div.remove()
    }
}