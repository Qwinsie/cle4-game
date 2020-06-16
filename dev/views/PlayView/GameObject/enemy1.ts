/// <reference path="../gameobject.ts"/>

class Enemy1 extends GameObject {

    private leftspeed : number = 0
    private rightspeed : number = 0

    private alive : boolean = true

    constructor(xStart : number, yStart : number, name : string) {
        super(xStart, yStart, name)
    }

    public update() {
    this.leftspeed =+ 1

    let newX = this._x - this.leftspeed + this.rightspeed
        // If monster is inside the screen
        if (newX < (1440 - this._div.clientWidth)){
         this._x = newX
        }
        if (newX < 0 - this._div.clientWidth) {
            this._div.remove()
        }
        super.update("enemy1")
    }

    public kill() {
        this.alive = false
        this._div.remove()
    }
}