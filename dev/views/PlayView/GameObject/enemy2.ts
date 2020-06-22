/// <reference path="../gameobject.ts"/>

class Enemy2 extends GameObject {

    private leftspeed : number = 0
    private rightspeed : number = 0

    private alive : boolean = true

    constructor(xStart: number, yStart: number, name: string, game: Game) {
        super(xStart, yStart, name, game)
    }

    public update() {

        // TESTING NEW UPDATE
        // TESTING NEW UPDATE
        // TESTING NEW UPDATE

        // Stop jumping when in jumping action
        if(this.jumping == false){
            this.yVelo -= 40;
            this.yVelo += 1.4;
            this._y += this.yVelo;
            this.yVelo *= 0.90;
            this.jumping = true;
            console.log("Jumping")
        }
        // Standard Velocity values for Enemy2 to move

        // If Enemy2 lands on the ground stop falling
        if(this._y > 600){
            this._y = 600;
            this.yVelo = 0;
        }

            super.update()
        
    }

    // OLD UPDATE
    // OLD UPDATE
    // OLD UPDATE

    // public update() {
        
    //     // Stop jumping when in jumping action
    //     if(this.jumping == false){
    //         this.yVelo -= 40;
    //         this.jumping = true;
    //     }
    //     // Standard Velocity values for Enemy2 to move
    //     this.yVelo += 1.4;
    //     this._y += this.yVelo;
    //     this.yVelo *= 0.90;

    //     // If Enemy2 lands on the ground stop falling
    //     if(this._y > 600){
    //         this.jumping = false;
    //         this._y = 600;
    //         this.yVelo = 0;
    //     }

    //     let newX = this._x - this.leftspeed + this.rightspeed

    //     if (newX < this._x || newX > this._x || this._y <= 600){
    //         if (newX > 0 && newX < (1440 - this._div.clientWidth)) {
    //             this._x = newX
    //         }
    //         super.update()
    //     }
    // }

    public jump() {
        this.jumping = false
        console.log("Ready to jump");
    }

    public kill() {
        this.alive = false
        this._div.remove()
    }
}