/// <reference path="../gameobject.ts"/>

class Enemy2 extends GameObject {
    // Fields

    private yVelo : number = 0

    private leftspeed : number = 0
    private rightspeed : number = 0

    private alive : boolean = true

    // Inputs
    private jumping : boolean = true

    constructor(xStart : number, yStart : number, name : string) {
        super(xStart, yStart, name)
    }

    public update() {
        if(this.jumping == false){
            this.yVelo -= 40;
            this.jumping = true;
        }

        this.yVelo += 1.0;
        this._y += this.yVelo;
        this.yVelo *= 0.98;

        // Land on the ground
        if(this._y > 600){
            this.jumping = false;
            this._y = 600;
            this.yVelo = 0;
        }

        // Moving Enemy left OR right
        let newX = this._x - this.leftspeed + this.rightspeed

        if (newX < this._x || newX > this._x || this._y <= 600){
            if (newX > 0 && newX < (1440 - this._div.clientWidth)) {
                this._x = newX
            }
            this.move("enemy2")
        }
    }

    // General Functions
    public getRectangle() {
        return this._div.getBoundingClientRect()
    }

    public kill() {
        this.alive = false
        this._div.remove()
    }
}