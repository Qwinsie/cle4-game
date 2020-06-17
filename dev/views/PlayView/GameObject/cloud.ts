/// <reference path="../gameobject.ts"/>

class Cloud extends GameObject {

    private xspeed : number = 0

    constructor(xStart: number, yStart: number, name : string, speed : number, game:Game) {
        super(xStart, yStart, name, game)
        this.xspeed = speed
    }

    public update() {
        this._x += this.xspeed

        this._div.style.transform = `translate(${this._x}px, ${this._y}px)`
    }
}