/// <reference path="../gameobject.ts"/>

class Enemy2 extends GameObject {

    private alive : boolean = true

    constructor(xStart: number, yStart: number, name: string, game: Game) {
        super(xStart, yStart, name, game)
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

    public jump() {
        this.jumping = true;
        this.yVelo -= 40; // Height of the jump
    }

    public kill() {
        this.alive = false
        this._div.remove()
    }
}