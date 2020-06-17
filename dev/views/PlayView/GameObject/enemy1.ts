/// <reference path="../gameobject.ts"/>

class Enemy1 extends GameObject {

    private leftspeed: number = 0
    private rightspeed: number = 0

    private alive: boolean = true

    constructor(xStart: number, yStart: number, name: string, game: Game) {
        super(xStart, yStart, name, game)
    }

    public update() {
        this.leftspeed = + 1

        let newX = this._x - this.leftspeed + this.rightspeed
        // If monster is inside the screen
        if (newX < (1440 - this._div.clientWidth)) {
            this._x = newX
        }
        if (newX < 0 - this._div.clientWidth) {
            this._div.remove()
        }
        super.update()
    }

    public kill() {
        this.alive = false
        this._div.remove()
    }
}